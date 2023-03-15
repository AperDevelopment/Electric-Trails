const NominatimBaseURL = "https://nominatim.openstreetmap.org/search?";
const requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

export const autocompleteQuery = (input, callback) => {
    const params = {
        q: input,
        format: 'json',
        addressdetails: 1,
        polygon_geojson: 0
    };

    const query = new URLSearchParams(params).toString();

    fetch(`${NominatimBaseURL}${query}`, requestOptions)
        .then((res) => res.json())
        .then((res) => callback(res));
}