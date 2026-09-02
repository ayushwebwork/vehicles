function exportUnreachableToCSV() {

    // Check fleet data
    if (
        typeof fleetData === "undefined" ||
        !Array.isArray(fleetData)
    ) {
        alert("Fleet data is not available.");
        return;
    }


    // Get only unreachable vehicles
    const unreachableVehicles =
        getUnreachableVehicles(fleetData);


    if (unreachableVehicles.length === 0) {
        alert("No unreachable vehicles found.");
        return;
    }


    // CSV headers
    const headers = [
        "S.No.",
        "Ward",
        "Vehicle No.",
        "Key No",
        "Route Cover",
        "Status",
        
        "Driver",
        "Route",
        "Time Recorded",
    ];


    // Create CSV rows
    const rows = unreachableVehicles.map(
        (vehicle, index) => {

            return [
                index + 1,

                vehicle.wardname || "-",

                vehicle.vehicleno || "-",

                getKeyNo(vehicle.vehicleno),
                vehicle.routecleaned_p == null ? "" : (vehicle.routecleaned_p)+"%",

                vehicle.vehiclestatus ||
                vehicle.status ||
                "Unreachable",

                

                vehicle.drivername || "-",

                vehicle.routename || "",
                vehicle.timerecorded ||
                vehicle.time_recorded ||
                "-",
            ];

        }
    );


    // Escape CSV values
    function escapeCSV(value) {

        value = String(value ?? "");

        /*
         * If value contains:
         * comma
         * quote
         * newline
         *
         * wrap it in quotes.
         */

        if (
            value.includes(",") ||
            value.includes('"') ||
            value.includes("\n") ||
            value.includes("\r")
        ) {

            value =
                '"' +
                value.replace(
                    /"/g,
                    '""'
                ) +
                '"';

        }

        return value;
    }


    // Convert to CSV
    let csv =
        headers
            .map(escapeCSV)
            .join(",") +
        "\r\n";


    rows.forEach(row => {

        csv +=
            row
                .map(escapeCSV)
                .join(",") +
            "\r\n";

    });


    /*
     * Add UTF-8 BOM.
     *
     * This helps Excel correctly display
     * the CSV, especially with Indian text.
     */

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


    // Create download URL
    const url =
        URL.createObjectURL(blob);


    // Create download link
    const link =
        document.createElement("a");


    link.href = url;


    // Generate filename
    const now = new Date();

    const date =
        String(
            now.getDate()
        ).padStart(2, "0");

    const month =
        String(
            now.getMonth() + 1
        ).padStart(2, "0");

    const year =
        now.getFullYear();

    const hours =
        String(
            now.getHours()
        ).padStart(2, "0");

    const minutes =
        String(
            now.getMinutes()
        ).padStart(2, "0");


    link.download =
        `unreachable-vehicles-${year}-${month}-${date}-${hours}${minutes}.csv`;


    document.body.appendChild(link);


    // Start download
    link.click();


    // Cleanup
    link.remove();

    setTimeout(() => {

        URL.revokeObjectURL(url);

    }, 1000);

}