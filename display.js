function displayResults() {

    const output =
        document.getElementById("outputdata");

    output.innerHTML = `

        <h3 style="padding:1rem">
            Vehicles Idle More Than 20 Minutes:
            ${window.idleOver20.length}
        </h3>

        <table border="1" cellpadding="6">

            <thead>
                <tr>
                    <th>Vehicle</th>
                    <th>Idle Time</th>
                    <th>Driver</th>
                    <th>Ward</th>
                    <th>Route</th>
                    <th>Speed</th>
                    <th>Time</th>
                </tr>
            </thead>

            <tbody>

                ${window.idleOver20.map(vehicle => `

                    <tr>

                        <td style="text-wrap:nowrap;">
                            ${vehicle.vehicleno || ""}
                        </td>

                       

                        <td style="text-wrap:nowrap;">
                            ${vehicle.status.replace(
                                /^Idle since-\s*/,
                                ""
                            )}
                        </td>

                        <td style="text-wrap:nowrap;">
                            ${vehicle.drivername || ""}
                        </td>

                        <td style="text-wrap:nowrap;">
                            ${vehicle.wardname || ""}
                        </td>

                        <td>
                            ${vehicle.routename || ""}
                        </td>

                        <td>
                            ${vehicle.speed ?? ""}
                        </td>

                        <td style="text-wrap:nowrap;">
                            ${vehicle.timerecorded || ""}
                        </td>

                    </tr>

                `).join("")}

            </tbody>

        </table>
    `;
}