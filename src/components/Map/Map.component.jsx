import './Map.component.css';
import {FeatureGroup, MapContainer, Polyline, TileLayer, useMap} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import MarkerComponent from "../Marker";

const Map = ({center, start, end, path = [], stops = []}) => {
    function ChangeView({center, markers}) {
        const map = useMap();
        map.setView(center, 13);

        let markerBounds = L.latLngBounds([]);
        markers.forEach(marker => markerBounds.extend([marker]));

        markerBounds.isValid() && map.fitBounds(markerBounds);
        return null;
    }

    return (
        <div className='map-container'>
            <MapContainer
                center={center}
                zoom={13}
                style={{width: '100%', height: '100%'}}
            >
                <ChangeView
                    center={center}
                    markers={[start.coordinates, ...stops.map(stop => stop.coordinates), end.coordinates]}
                />

                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <FeatureGroup>
                    {start && <MarkerComponent location={start} type='start'/>}
                    {end && <MarkerComponent location={end} type='end'/>}
                    {path.length > 0 && <Polyline positions={path}/>}
                    {stops.length > 0 ? stops.map(stop => <MarkerComponent key={stop.id} location={stop} type='stop' />) : null}
                </FeatureGroup>
            </MapContainer>
        </div>
    );
};

export default Map;