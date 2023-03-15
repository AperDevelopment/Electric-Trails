const url = `https://ev-v2.cc.api.here.com/ev/stations`;
const stationsPerStop = 5;

export const stationsAlongTheRoute = (coordinates, range, stopsCount, callback) => {
    let points = '';
    coordinates.forEach(coords => points = `${points};${coords[0]},${coords[1]}`);

    return fetch(`${url}?apiKey=${process.env.REACT_APP_HERE_API_KEY}`, {
        method: 'POST',
        body: `{'maxResults': ${stationsPerStop * stopsCount}, 'corridor': {'width': ${range / 2}, 'points': ${points}}}`,
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.json())
        .then(data => callback(data));
};