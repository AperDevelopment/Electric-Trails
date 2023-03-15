import './App.css';
import Map from "./components/Map";
import Menu from "./components/Menu";
import {useState} from "react";

const center = [45.648916, 5.858074];

function App() {
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [path, setPath] = useState([]);
    const [stops, setStops] = useState([]);

    return (
        <div className="App">
            <div className="body">
                <h1>Electric Trails</h1>
                <Menu start={start} end={end} setStart={setStart} setEnd={setEnd} setPath={setPath} setStops={setStops} />
            </div>
            <Map center={center} start={start} end={end} path={path} stops={stops} />
        </div>
    );
}

export default App;
