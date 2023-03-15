export class Vehicle {
    ///////////////////////////////////////////////////////////////////////////////////////////////
    // Attributes /////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////
    id: string;

    naming: {
        make: string,
        model: string,
        chargetrip_version: string,
    };

    charging_time: number;

    range: {
        best: string,
        worst: string,
    };

    image: string;

    ///////////////////////////////////////////////////////////////////////////////////////////////
    // Constructors ///////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////////////////////////
    constructor(vehicle) {
        const { id, naming, connectors, range, media } = vehicle;

        this.id = id;

        const { make, model, chargetrip_version } = naming;
        this.naming = {
            make: make,
            model: model,
            chargetrip_version: chargetrip_version,
        };

        this.charging_time = Number(connectors.time);

        const { chargetrip_range } = range;
        this.range = {
            best: chargetrip_range.best,
            worst: chargetrip_range.worst,
        };

        const { thumbnail_url } = media.image;
        this.image = thumbnail_url;
    }
}