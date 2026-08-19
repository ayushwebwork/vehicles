
/* =====================================================
   GET VEHICLES WITH CLEANING % BELOW 90
   ===================================================== */

function getLowCleaningVehicles() {

    document.getElementById(
                "current_timestamp"
            ).textContent =`${window.fleetMeta.generatedAt}`;

            
    if (
        typeof fleetData === "undefined" ||
        !Array.isArray(fleetData)
    ) {
        return [];
    }


 const vehicles = fleetData.filter(
    vehicle => {

        const cleaning =
            Number(
                vehicle.routecleaned_p
            );

        const totalPoints =
            Number(
                vehicle.totalpoints
            );

        return (
            !isNaN(cleaning) &&
            cleaning < 90 &&
            !isNaN(totalPoints) &&
            totalPoints > 0
        );

    }
);


    /* SORT BY WARD */

    vehicles.sort(
        (a, b) => {

            const wardA =
                parseInt(
                    String(
                        a.wardname || ""
                    )
                    .match(/\d+/)?.[0]
                    || "999999",
                    10
                );


            const wardB =
                parseInt(
                    String(
                        b.wardname || ""
                    )
                    .match(/\d+/)?.[0]
                    || "999999",
                    10
                );


            if (
                wardA !== wardB
            ) {

                return wardA - wardB;

            }


            return String(
                a.vehicleno || ""
            ).localeCompare(
                String(
                    b.vehicleno || ""
                ),
                undefined,
                {
                    numeric: true,
                    sensitivity: "base"
                }
            );

        }
    );


    return vehicles;

}