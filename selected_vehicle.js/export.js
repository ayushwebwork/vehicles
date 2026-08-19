
    /* =====================================================
       EXPORT
    ===================================================== */

    function exportToExcel() {

        if (
            selectedVehicles.length === 0
        ) {

            showMessage(
                "Please find at least one vehicle before exporting.",
                "error"
            );

            return;

        }


        const headers = [

            "Vehicle",
            "Cleaning %",
            "Vehicle Key No.",
            "Vehicle Type",
            "Status",
            "Driver",
            
            "Speed",
            "Time",
            "Place",
            "Ward",
            "Route",
            "Latitude",
            "Longitude",
            "GPS",
            "Vehicle Battery",
            "GPS Battery",
            "Ignition",
            "Cleaned Points",
            "Total Points",
            

        ];


        const rows =
            selectedVehicles.map(
                vehicle => [

                    // vehicle.vehicleno,
                    normalizeVehicleNumber(vehicle.vehicleno),
                    vehicle.routecleaned_p,
                    getKeyNo(vehicle.vehicleno),
                    vehicle.vehicletype,
                    vehicle.status,
                    vehicle.drivername,
                    
                    vehicle.speed,
                    vehicle.timerecorded,
                    vehicle.place,
                    vehicle.wardname,
                    vehicle.routename,
                    vehicle.latitude,
                    vehicle.longitude,
                    vehicle.gps,
                    vehicle.vehiclebattery,
                    vehicle.gpsbattery,
                    vehicle.ignition,
                    vehicle.totalcleanedpoints,
                    vehicle.totalpoints,
                    

                ]
            );


        const csv = [

            headers,

            ...rows

        ]
        .map(
            row =>
                row
                    .map(
                        value =>
                            `"${safe(value).replace(
                                /"/g,
                                '""'
                            )}"`
                    )
                    .join(",")
        )
        .join("\r\n");


        const blob =
            new Blob(
                [
                    "\uFEFF" + csv
                ],
                {
                    type:
                        "text/csv;charset=utf-8;"
                }
            );


        const url =
            URL.createObjectURL(
                blob
            );


        const link =
            document.createElement(
                "a"
            );


        link.href =
            url;


        link.download =
            "Selected_Vehicle_Details.csv";


        document.body.appendChild(
            link
        );


        link.click();


        document.body.removeChild(
            link
        );


        URL.revokeObjectURL(
            url
        );


        showMessage(
            "Vehicle report exported successfully.",
            "success"
        );

    }