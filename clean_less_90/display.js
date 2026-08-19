
/* =====================================================
   DISPLAY
   ===================================================== */

/* =====================================================
   SAFE HTML
   ===================================================== */

function safe(value) {

    return String(
        value ?? "-"
    )

    .replace(
        /&/g,
        "&amp;"
    )

    .replace(
        /</g,
        "&lt;"
    )

    .replace(
        />/g,
        "&gt;"
    )

    .replace(
        /"/g,
        "&quot;"
    )

    .replace(
        /'/g,
        "&#039;"
    );

}

function displayResults() {

    const output =
        document.getElementById(
            "outputdata"
        );


    const vehicles =
        getLowCleaningVehicles();


    const totalVehicles =
        Array.isArray(
            window.fleetData
        )
            ? window.fleetData.length
            : 0;


    let html = `

        <div class="summary">


            <div class="card">

                <div class="label">
                    Total Vehicles
                </div>

                <div class="value">
                    ${totalVehicles}
                </div>

            </div>


            <div class="card red">

                <div class="label">
                    Cleaning Below 90%
                </div>

                <div class="value">
                    ${vehicles.length}
                </div>

            </div>


        </div>


        <div class="table-wrapper">

            <table>

                <thead>

                    <tr>

                    
                        <th>Ward Name</th>
<th>Route Coverage %</th>
                        

                        <th>Vehicle No.</th>
                        <th>Vehicle Key No.</th>
                        
                        <th>Vehicle Type</th>
                        <th>VStatus</th>
                        <th>Driver Name</th>

                        <th>Time Recorded</th>

                       

                        <th>Vehicle Status</th>

                        

                        <th>Speed</th>

                        <th>GSM</th>

                        <th>GPS</th>

                        <th>Vehicle Battery</th>

                        <th>GPS Battery</th>

                        

                        <th>Driver Mobile</th>

                        

                        

                        <th>Ignition</th>

                        <th>Route Name</th>

                        <th>Total Points</th>

                        <th>Total Cleaned Points</th>

                        <th>Total Not Cleaned Points</th>

                        

                        

                    </tr>

                </thead>


                <tbody>

    `;


    if (
        vehicles.length === 0
    ) {

        html += `

            <tr>

                <td
                    colspan="32"
                    class="no-data"
                >

                    No vehicles found
                    with Cleaning % below 90%.

                </td>

            </tr>

        `;

    }
    else {

        vehicles.forEach(
            (vehicle, index) => {

                html += `

                    <tr>

                    
                        <td>
                            ${safe(
                                vehicle.wardname
                            )}
                        </td>

                        
<td>

                            <span class="cleaning">

                                ${safe(
                                    vehicle.routecleaned_p
                                )}%

                            </span>

                        </td>
                        <td>
                            <strong>
                                ${safe(
                                    normalizeVehicleNumber(vehicle.vehicleno)
                                )}
                                
                            </strong>
                        </td>
                        <td>${getKeyNo(vehicle.vehicleno)}</td>
                        
                         <td>
                            ${safe(
                                vehicle.vehicletype
                            )}
                        </td>
                        
                        <td>
                            ${safe(
                                vehicle.vstatus
                            )}
                        </td>
                        <td>
                            ${safe(
                                vehicle.drivername
                            )}
                        </td>

                        <td>
                            ${safe(
                                vehicle.timerecorded
                            )}
                        </td>

                        

                        <td>
                            ${safe(
                                vehicle.vehiclestatus
                            )}
                        </td>

                        

                        <td>
                            ${safe(
                                vehicle.speed
                            )}
                        </td>

                        <td>
                            ${safe(
                                vehicle.gsm
                            )}
                        </td>

                        <td>
                            ${safe(
                                vehicle.gps
                            )}
                        </td>

                        <td>
                            ${safe(
                                vehicle.vehiclebattery
                            )}
                        </td>

                        <td>
                            ${safe(
                                vehicle.gpsbattery
                            )}
                        </td>

                        

                        <td>
                            ${safe(
                                vehicle.drivermobile
                            )}
                        </td>

                       

                        

                        <td>
                            ${safe(
                                vehicle.ignition
                            )}
                        </td>

                        <td>
                            ${safe(
                                vehicle.routename
                            )}
                        </td>

                        <td>
                            ${safe(
                                vehicle.totalpoints
                            )}
                        </td>

                        <td>
                            ${safe(
                                vehicle.totalcleanedpoints
                            )}
                        </td>

                        <td>
                            ${safe(
                                vehicle.totalnotcleanedpoints
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


    output.innerHTML =
        html;

}

displayResults();