
/* =====================================================
   CSV EXPORT — ALL VEHICLE DATA
   ===================================================== */

function exportCleaningCSV() {

    const vehicles =
        getLowCleaningVehicles();


    if (
        vehicles.length === 0
    ) {

        alert(
            "No vehicles found with Cleaning % below 90%."
        );

        return;

    }


    const headers = [

        "S.No.",
        "Ward Name",
    "Route Coverage %",
        "Vehicle No.",
        "Vehicle Key No.",
        "Vehicle Type",
        "VStatus",
        "Driver Name",
        "Time Recorded",
       
      
        
        "Speed",
        "GSM",
        "GPS",
        "Vehicle Battery",
        "GPS Battery",
        
        "Driver Mobile",
        
       
        "Ignition",
        "Route Name",
        "Total Points",
        "Total Cleaned Points",
        "Total Not Cleaned Points",
        
      
        
 

    ];


    const rows =
        vehicles.map(
            (vehicle, index) => [

                index + 1,
                vehicle.wardname,                
vehicle.routecleaned_p,
                normalizeVehicleNumber(vehicle.vehicleno),
                getKeyNo(vehicle.vehicleno),
                vehicle.vehicletype,
                vehicle.vstatus,
                vehicle.drivername,

                vehicle.timerecorded,
                

                vehicle.speed,

                vehicle.gsm,

                vehicle.gps,

                vehicle.vehiclebattery,

                vehicle.gpsbattery,

                

                vehicle.drivermobile,

                

                vehicle.ignition,

                vehicle.routename,

                vehicle.totalpoints,

                vehicle.totalcleanedpoints,

                vehicle.totalnotcleanedpoints,

                

               

                

             

            ]
        );


    function escapeCSV(value) {

        const text =
            String(
                value ?? ""
            );


        if (
            text.includes(",") ||
            text.includes('"') ||
            text.includes("\n") ||
            text.includes("\r")
        ) {

            return (
                '"' +
                text.replace(
                    /"/g,
                    '""'
                ) +
                '"'
            );

        }


        return text;

    }


    const csv = [

        headers,

        ...rows

    ]

    .map(
        row =>
            row
                .map(escapeCSV)
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


    link.href = url;


    link.download =
        "Vehicles_Cleaning_Below_90_Percent.csv";


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

}