import {createClient, defaultExchanges} from "@urql/core";

import {vehicleListQuery} from "./queries/VehicleList.query";
import {Vehicle} from "../model/Vehicle.model";

const headers = {
    "x-client-id": process.env.REACT_APP_CHARGETRIP_PROJECT_ID,
    "x-app-id": process.env.REACT_APP_CHARGETRIP_APPLICATION_ID,
};

const client = createClient({
    url: 'https://api.chargetrip.io/graphql',
    fetchOptions: {
        method: 'POST',
        headers,
    },
    exchanges: [...defaultExchanges],
});

export const getVehicleList = (search = '', callback) => {
    client
        .query(vehicleListQuery, {page: 0, size: 869, search})
        .toPromise()
        .then(res => {
            // noinspection JSUnresolvedVariable
            const vehicles: Vehicle[] = res.data?.vehicleList.map(vehicle => new Vehicle(vehicle));
            const groupedVehicles = new Map();

            vehicles.forEach(vehicle => {
                if (groupedVehicles.has(vehicle.naming.make)) groupedVehicles.set(vehicle.naming.make, [...groupedVehicles.get(vehicle.naming.make), vehicle]);
                else groupedVehicles.set(vehicle.naming.make, [vehicle]);
            });

            callback(groupedVehicles);
        })
        .catch(e => console.error(e));
}
