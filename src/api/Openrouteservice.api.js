import {reverse} from "../utils";

const url = `https://api.openrouteservice.org/v2/directions/driving-car`;

export const twoPointDirections = (start, end, callback) => {
    return fetch(url, {
        method: 'POST',
        body: `{"coordinates":[[${reverse(start.coordinates)}], [${reverse(end.coordinates)}]]}`,
        headers: {
            'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
            'Authorization': process.env.REACT_APP_OPENROUTESERVICE_API_KEY,
            'Content-Type': 'application/json; charset=utf-8'
        }
    })
        .then(res => res.json())
        .then(data => callback(data));
};

export const multiPointDirections = (points, callback) => {
    fetch(url, {
        method: 'POST',
        body: `{"coordinates":[${points.map(point => `[${reverse(point.coordinates)}], `)}]}`,
        headers: {
            'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
            'Authorization': process.env.REACT_APP_OPENROUTESERVICE_API_KEY,
            'Content-Type': 'application/json; charset=utf-8'
        }
    })
        .then(res => res.json())
        .then(data => callback(data));
};