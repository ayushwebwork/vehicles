function getUnreachableVehicles(data) {

    if (!Array.isArray(data)) {
        return [];
    }


    const unreachableVehicles =
        data.filter(vehicle => {

            const status = String(
                vehicle.vehiclestatus ||
                vehicle.status ||
                ""
            )
            .trim()
            .toLowerCase();


            return status.startsWith(
                "unreachable"
            );

        });


    /*
     * Sort:
     *
     * 1. Ward number
     * 2. Vehicle number
     */

    unreachableVehicles.sort(
        (a, b) => {

            const wardA =
                extractWardNumber(
                    a.wardname
                );

            const wardB =
                extractWardNumber(
                    b.wardname
                );


            if (wardA !== wardB) {

                return wardA - wardB;

            }


            const vehicleA =
                String(
                    a.vehicleno || ""
                ).toUpperCase();


            const vehicleB =
                String(
                    b.vehicleno || ""
                ).toUpperCase();


            return vehicleA.localeCompare(
                vehicleB,
                undefined,
                {
                    numeric: true,
                    sensitivity: "base"
                }
            );

        }
    );


    return unreachableVehicles;

}


function extractWardNumber(ward) {

    const match =
        String(
            ward || ""
        ).match(/\d+/);


    if (!match) {

        return 999999;

    }


    return parseInt(
        match[0],
        10
    );

}