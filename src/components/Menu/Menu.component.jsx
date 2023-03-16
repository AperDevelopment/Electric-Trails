import './Menu.component.css';
import VehicleDropdown from "../VehicleDropdown";
import {useState} from "react";
import {Button, Chip, styled} from "@mui/material";
import LocationAutocomplete from "../LocationAutocomplete";
import {twoPointDirections} from "../../api/Openrouteservice.api";
import {coordinatesDistance} from "../../utils";
import {stationsAlongTheRoute} from "../../api/HereEV.api";
import {calculateTravelTime} from "../../api/BackEnd.api";
const polylineUtil = require('polyline-encoded');

const ConfirmButton = styled(Button)({
    margin: '0 2em',
    width: 'calc(100% - 4em)',
    backgroundColor: 'var(--dark-teal)',
    '&:hover': {
        backgroundColor: 'var(--light-teal)'
    }
});

const Menu = ({start, setStart, end, setEnd, setPath, setStops}) => {
    const [vehicle, setVehicle] = useState(null);
    const [duration, setDuration] = useState(-1);

    const decode = (data) => polylineUtil.decode(data.routes[0].geometry);
    const onSearch = () => {
        setPath([]);
        let stops = [];

        twoPointDirections(start, end, async (data) => {
            const p = decode(data);
            setPath(p);

            calculateTravelTime(p, (message) => setDuration(Number(message)));

            const ds = [0];

            for (let i = 1; i < p.length; i++) {
                ds.push(ds[i - 1] + coordinatesDistance(p[i - 1], p[i]));

                if (vehicle.range.worst < ds[i]) {
                    await stationsAlongTheRoute(p, vehicle.range.worst, ds[i] / vehicle.range.worst, (data) => {
                        console.log(data);

                        // if (res.data?.stationAround) {
                        //     const stations = res.data?.stationAround.map(station => new StopModel(station));
                        //     console.log(stations);
                        //     stops.push(stations[0]);
                        // }
                    });

                    ds[i] = 0;
                }
            }
        })
            .then(() => setStops(stops));
    };

    return (
        <div className='menu-container'>
            <div className='place-input'>
                <LocationAutocomplete placeholder='Départ' location={start} setLocation={setStart} />
            </div>

            <div className='place-input'>
                <LocationAutocomplete placeholder='Arrivée' location={end} setLocation={setEnd} />
            </div>

            <VehicleDropdown vehicle={vehicle} setVehicle={setVehicle} />

            {duration !== -1 && <Chip label={`Durée de trajet : ${duration}`} />}

            <ConfirmButton variant='contained' onClick={onSearch}>Valider</ConfirmButton>
        </div>
    );
}

export default Menu;