function displayUnreachableResults() {

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


    const unreachableVehicles =
        getUnreachableVehicles(fleetData);


        document.getElementById(
                "current_timestamp"
            ).textContent =`${window.fleetMeta.generatedAt}`;
            
    /*
     * ==========================================
     * WARD-WISE KPI
     * ==========================================
     */

    const wardStats = {};


    fleetData.forEach(vehicle => {

        const ward =
            String(
                vehicle.wardname || "Unknown"
            ).trim();


        if (!wardStats[ward]) {

            wardStats[ward] = {

                total: 0,

                unreachable: 0

            };

        }


        wardStats[ward].total++;


        const status =
            String(
                vehicle.vehiclestatus ||
                vehicle.status ||
                ""
            )
            .trim()
            .toLowerCase();


        if (
            status.startsWith("unreachable")
        ) {

            wardStats[ward].unreachable++;

        }

    });


    /*
     * Sort wards numerically
     */

    const wards =
        Object.keys(wardStats).sort(
            (a, b) => {

                return (
                    extractWardNumber(a) -
                    extractWardNumber(b)
                );

            }
        );


    /*
     * ==========================================
     * SUMMARY KPI
     * ==========================================
     */

    const totalVehicles =
        fleetData.length;


    const totalUnreachable =
        unreachableVehicles.length;


    const overallPercentage =
        totalVehicles > 0

            ? (
                totalUnreachable /
                totalVehicles
            ) * 100

            : 0;


    let html = `

        <!-- OVERALL KPI -->

        <div class="report-summary">


            <div class="summary-card">

                <div class="summary-label">
                    Total Vehicles
                </div>

                <div class="summary-value">
                    ${totalVehicles}
                </div>

            </div>


            <div class="summary-card unreachable">

                <div class="summary-label">
                    Unreachable Vehicles
                </div>

                <div class="summary-value">
                    ${totalUnreachable}
                </div>

            </div>


            <div class="summary-card percentage">

                <div class="summary-label">
                    Overall Unreachable %
                </div>

                <div class="summary-value">
                    ${overallPercentage.toFixed(1)}%
                </div>

            </div>


        </div>


        <!-- WARD KPI -->

        <div class="kpi-section">

            <div class="section-title">

                Ward-wise Unreachable KPI

            </div>


            <div class="ward-kpi-grid">

    `;


    wards.forEach(ward => {

        const stats =
            wardStats[ward];

// Do not show wards with zero unreachable vehicles
    if (stats.unreachable === 0) {
        return;
    }
    
        const percentage =
            stats.total > 0

                ? (
                    stats.unreachable /
                    stats.total
                ) * 100

                : 0;


        let severity =
            "normal";


        if (percentage >= 20) {

            severity = "critical";

        }
        else if (percentage >= 10) {

            severity = "warning";

        }


        html += `

            <div class="
                ward-kpi-card
                ${severity}
            ">

                <div class="ward-kpi-header">

                    <span class="ward-name">

                        ${escapeHTML(ward)}

                    </span>

                    <span class="ward-percent">

                        ${percentage.toFixed(1)}%

                    </span>

                </div>


                <div class="ward-kpi-values">

                    <div>

                        <span class="kpi-number">

                            ${stats.unreachable}

                        </span>

                        <span class="kpi-label">

                            Unreachable

                        </span>

                    </div>


                    <div>

                        <span class="kpi-number">

                            ${stats.total}

                        </span>

                        <span class="kpi-label">

                            Total

                        </span>

                    </div>

                </div>


                <div class="progress-bar">

                    <div
                        class="progress-fill"
                        style="
                            width:${Math.min(
                                percentage,
                                100
                            )}%;
                        "
                    ></div>

                </div>

            </div>

        `;

    });


    html += `

            </div>

        </div>


        <!-- VEHICLE TABLE -->

        <div class="table-wrapper">

            <table>

                <thead>

                    <tr>

                        <th>S.No.</th>

                        <th>Ward</th>

                        <th>Vehicle No.</th>
                        <th>Vehicle Type</th>

                        <th>Vehicle ID</th>

                        <th>Status</th>

                        <th>Time Recorded</th>

                        <th>Driver</th>

                        <th>Location</th>

                    </tr>

                </thead>

                <tbody>

    `;


    if (
        unreachableVehicles.length === 0
    ) {

        html += `

            <tr>

                <td
                    colspan="8"
                    class="no-data"
                >

                    No unreachable vehicles found.

                </td>

            </tr>

        `;

    }
    else {

        unreachableVehicles.forEach(
            (vehicle, index) => {

                html += `

                    <tr>

                        <td>
                            ${index + 1}
                        </td>

                        <td>
                            ${escapeHTML(
                                vehicle.wardname ||
                                "-"
                            )}
                        </td>

                        <td class="vehicle-no">
                            ${escapeHTML(
                                vehicle.vehicleno ||
                                "-"
                            )}
                        </td>
                        <td>
                        ${safe(
                                vehicle.vehicletype
                            )}
                        </td>

                        <td>
                            ${escapeHTML(
                                vehicle.vehicleid ||
                                "-"
                            )}
                        </td>

                        <td>

                            <span
                                class="unreachable-badge"
                            >

                                ${escapeHTML(
                                    vehicle.vehiclestatus ||
                                    vehicle.status ||
                                    "Unreachable"
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


/*
 * Extract ward number
 */

function extractWardNumber(ward) {

    const match =
        String(ward || "")
            .match(/\d+/);


    if (!match) {

        return 999999;

    }


    return parseInt(
        match[0],
        10
    );

}


/*
 * HTML protection
 */

function escapeHTML(value) {

    return String(value ?? "")

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}