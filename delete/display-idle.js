function displayIdleResults() {

    const output =
        document.getElementById("outputdata");


    if (typeof fleetData === "undefined") {

        output.innerHTML = `
            <div class="no-data">
                Fleet data not available.
            </div>
        `;

        return;
    }


    const idleVehicles =
        getIdleVehicles(fleetData);


    let html = `

        <div class="report-summary">

            <div class="summary-card">

                <div class="summary-label">
                    Total Vehicles
                </div>

                <div class="summary-value">
                    ${fleetData.length}
                </div>

            </div>


            <div class="summary-card idle">

                <div class="summary-label">
                    Idle Vehicles
                </div>

                <div class="summary-value">
                    ${idleVehicles.length}
                </div>

            </div>

        </div>


        <div class="table-wrapper">

            <table>

                <thead>

                    <tr>

                        <th>S.No.</th>
                        <th>Ward</th>
                        <th>Vehicle No.</th>
                        <th>Vehicle ID</th>
                        <th>Status</th>
                        <th>Time Recorded</th>
                        <th>Driver</th>
                        <th>Location</th>

                    </tr>

                </thead>

                <tbody>
    `;


    if (idleVehicles.length === 0) {

        html += `

            <tr>

                <td
                    colspan="8"
                    class="no-data"
                >
                    No idle vehicles found.
                </td>

            </tr>

        `;

    } else {

        idleVehicles.forEach(
            (vehicle, index) => {

                html += `

                    <tr>

                        <td>
                            ${index + 1}
                        </td>

                        <td>
                            ${escapeHTML(
                                vehicle.wardname || "-"
                            )}
                        </td>

                        <td class="vehicle-no">
                            ${escapeHTML(
                                vehicle.vehicleno || "-"
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                vehicle.vehicleid || "-"
                            )}
                        </td>

                        <td>

                            <span class="idle-badge">

                                ${escapeHTML(
                                    vehicle.vehiclestatus ||
                                    vehicle.status ||
                                    "Idle"
                                )}

                            </span>

                        </td>

                        <td>
                            ${escapeHTML(
                                vehicle.timerecorded ||
                                vehicle.time_recorded ||
                                "-"
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                vehicle.drivername ||
                                "-"
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                vehicle.place ||
                                "-"
                            )}
                        </td>

                    </tr>

                `;
            }
        );
    }


    html += `

                </tbody>

            </table>

        </div>

    `;


    output.innerHTML = html;
}


function escapeHTML(value) {

    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}