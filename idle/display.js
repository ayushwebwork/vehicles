function displayResults() {

    const output =
        document.getElementById("outputdata");


    // Filter vehicles having Total Points > 0
// Then sort by Ward, then Vehicle Number

const sortedVehicles =
    [...window.idleOver20]
        .filter(vehicle => {

            const totalPoints =
                Number(vehicle.totalpoints);

            return (
                !isNaN(totalPoints) &&
                totalPoints > 0
            );

        })
        .sort((a, b) => {

            // Extract ward number
            const wardA =
                parseInt(
                    String(a.wardname || "")
                        .match(/\d+/)?.[0] || "999999",
                    10
                );

            const wardB =
                parseInt(
                    String(b.wardname || "")
                        .match(/\d+/)?.[0] || "999999",
                    10
                );


            // First sort by Ward
            if (wardA !== wardB) {

                return wardA - wardB;

            }


            // If same ward, sort by Vehicle Number
            return String(
                a.vehicleno || ""
            ).localeCompare(
                String(b.vehicleno || ""),
                undefined,
                {
                    numeric: true,
                    sensitivity: "base"
                }
            );

        });


    output.innerHTML = `

        <h3 style="padding:1rem">

            Vehicles Idle More Than 20 Minutes:
            ${sortedVehicles.length}

        </h3>


        <table
            border="1"
            cellpadding="6"
            style="width:100%; border-collapse:collapse;"
        >

            <thead>

                <tr>

                    <th>Vehicle</th>
                    <th>Route Cleaned</th>
                    <th>Vehicle Type</th>

                    <th>Idle Time</th>

                    <th>Driver</th>

                    <th>Ward</th>

                    <th>Route</th>

                    <th>Speed</th>

                    <th>Time</th>
                    

                </tr>

            </thead>


            <tbody>

                ${sortedVehicles.map(vehicle => `

                    <tr>

                        <td style="white-space:nowrap;">

                            ${vehicle.vehicleno || ""}

                        </td>
                        <td style="white-space:nowrap;">

                            ${vehicle.routecleaned_p == null ? "" : (vehicle.routecleaned_p)+"%"}

                        </td>
                        <td>
${safe(
                                vehicle.vehicletype
                            )}
                        </td>


                        <td style="white-space:nowrap;">

                            ${(vehicle.status || "")
                                .replace(
                                    /^Idle since-\s*/,
                                    ""
                                )}

                        </td>


                        <td style="white-space:nowrap;">

                            ${vehicle.drivername || ""}

                        </td>


                        <td style="white-space:nowrap;">

                            ${vehicle.wardname || ""}

                        </td>


                        <td>

                            ${vehicle.routename || ""}

                        </td>


                        <td>

                            ${vehicle.speed ?? ""}

                        </td>


                        <td style="white-space:nowrap;">

                            ${vehicle.timerecorded || ""}

                        </td>

                        

                    </tr>

                `).join("")}

            </tbody>

        </table>

    `;

}