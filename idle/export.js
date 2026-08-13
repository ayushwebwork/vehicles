function exportToExcel() {

    const data = window.idleOver20;

    if (!data || data.length === 0) {
        alert("No vehicles idle for more than 20 minutes.");
        return;
    }


    // Sort by Ward, then Vehicle Number
    const sortedData = [...data].sort((a, b) => {

        // Extract numeric Ward number
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


        // Sort by Ward first
        if (wardA !== wardB) {
            return wardA - wardB;
        }


        // Same Ward → sort by Vehicle Number
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


    const headers = [
        "Vehicle",
        "Route Cleaned",
        "Idle Time",
        "Driver",
        "Ward",
        "Route",
        "Speed",
        "Time"
    ];


    const rows = sortedData.map(vehicle => [

        vehicle.vehicleno || "",

        vehicle.routecleaned_p== null ? ""  : vehicle.routecleaned_p,

        String(vehicle.status || "")
            .replace(
                /^Idle since-\s*/,
                ""
            ),

        vehicle.drivername || "",

        vehicle.wardname || "",

        vehicle.routename || "",

        vehicle.speed ?? "",

        vehicle.timerecorded || ""

    ]);


    const csv = [

        headers,

        ...rows

    ]
    .map(row =>

        row.map(value =>

            `"${String(value)
                .replace(/"/g, '""')
            }"`

        ).join(",")

    )
    .join("\r\n");


    const blob = new Blob(

        [
            "\uFEFF" + csv
        ],

        {
            type:
                "text/csv;charset=utf-8;"
        }

    );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href = url;


    link.download =
        "Idle_Vehicles_Over_20_Minutes_By_Ward.csv";


    document.body.appendChild(link);


    link.click();


    document.body.removeChild(link);


    URL.revokeObjectURL(url);

}