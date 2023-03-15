import './VehicleDropdown.component.css';
import React, {useEffect, useState} from "react";

import {getVehicleList} from "../../api/Chargetrip.api";
import {flatten} from "../../utils";
import {TextField} from "@mui/material";
import Spinner from "../Spinner";

const VehicleDropdown = ({vehicle, setVehicle}) => {
    const [isLoaded, setLoaded] = useState(false);
    const [groupedVehicles, setGroupedVehicles] = useState(new Map());
    const [searchKeyword, setSearchKeyword] = useState('');

    useEffect(() => {
        getVehicleList('', vehicles => {
            setGroupedVehicles(vehicles);
            setLoaded(true);
        });
    }, []);

    useEffect(() => {
        getVehicleList(searchKeyword, vehicles => {
            setGroupedVehicles(vehicles);
            setLoaded(true);
        })
    }, [searchKeyword]);

    return (
        <div id='scroll-area' className='dropdown-container'>
            <TextField
                fullWidth
                id='search-field'
                label='Nom du véhicule'
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                sx={{
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            borderRadius: '4px 4px 0 0',
                        },
                    },
                }}
            />
            {isLoaded ? (
                <ul className='vehicle-list'>
                    {flatten(groupedVehicles).map((group, index) => {
                        const [header, vehicles] = group;
                        return (
                            <React.Fragment key={index}>
                                <li className='vehicle-list-header' key={header}>{header}</li>
                                {vehicles.map(v =>
                                    <li className={`vehicle-list-element ${vehicle === v ? 'selected' : ''}`} key={v.id}
                                        onClick={() => setVehicle(v)}>
                                        <div className="vehicle-list-image">
                                            <img className="vehicle-image" alt={v.naming.model}
                                                 src={v.image}/>
                                        </div>
                                        <div className="vehicle-list-data">
                                            <p>
                                                <strong>{v.naming.model} {v.naming.chargetrip_version || ''}</strong>
                                            </p>
                                            <p>Autonomie : {v.range.worst} - {v.range.best} km</p>
                                        </div>
                                    </li>
                                )}
                            </React.Fragment>
                        );
                    })}
                </ul>
            ) : (<Spinner className='vehicle-list' />)}
        </div>
    );
}

export default VehicleDropdown;