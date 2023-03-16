import {reverse} from "../utils";

const url = `http://localhost:5000/api/v1/path/travel-duration`;
// const url = `https://electric-trails-back.vercel.app/api/v1/path/travel-duration`;
const average_speed = 60.37;

export const calculateTravelTime = (points, callback) => {
    const body = {
        coordinates: points.map(point => reverse(point)),
        travel_speed: average_speed
    };

    const b = JSON.stringify(body);
    console.log(b);

    fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    })
        .then(res => res.json())
        .then(data => {
            const { message, success } = data;
            if (success) callback(message);
            else console.error(message);
        });
};