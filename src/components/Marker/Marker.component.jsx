import {Marker, Popup} from "react-leaflet";
import L from "leaflet";
import {Fragment} from "react";

const redIcon = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png';
const greenIcon = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png';
const blueIcon = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png';
const blackIcon = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-black.png';

type MarkerType = 'start' | 'end' | 'stop';

const iconFromMarker = (type: MarkerType) => {
    switch (type) {
        case "start": return greenIcon;
        case "end": return redIcon;
        case "stop": return blueIcon;
        default: return blackIcon;
    }
}

const icon = (type: MarkerType) => L.icon({
    iconUrl: iconFromMarker(type),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const MarkerComponent = ({ key, location, type }) => {
    return (
        <Fragment key={key}>
            <Marker position={location.coordinates} icon={icon(type)}>
                <Popup>
                    {location.display_name}
                </Popup>
            </Marker>
        </Fragment>
    );
}

export default MarkerComponent;