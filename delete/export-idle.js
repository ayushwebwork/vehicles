function exportIdleToCSV() {

    if (
        typeof fleetData === "undefined" ||
        !Array.isArray(fleetData)
    ) {

        alert("Fleet data is not available.");

        return;
    }


    // Get filtered + ward-sorted vehicles
    const idleVehicles =
        getIdleVehicles(fleetData);


    if (idleVehicles.length === 0) {

        alert("No idle vehicles found.");

        return;
    }


    const headers = [

        "S.No.",
        "Ward",
        "Vehicle No.",
        "Vehicle ID",
        "Status",
        "Time Recorded",
        "Driver",
        "Location"

    ];


    const rows =
        idleVehicles.map(
            (vehicle, index) => [

                index + 1,

                vehicle.wardname || "-",

                vehicle.vehicleno || "-",

                vehicle.vehicleid || "-",

                vehicle.vehiclestatus ||
                vehicle.status ||
                "Idle",

                vehicle.timerecorded ||
                vehicle.time_recorded ||
                "-",

                vehicle.drivername ||
                "-",

                vehicle.place ||
                "-"

            ]
        );


    function escapeCSV(value) {

        const text =
            String(value ?? "");


        if (
            text.includes(",") ||
            text.includes('"') ||
            text.includes("\n") ||
            text.includes("\r")
        ) {

            return '"' +
                text.replace(
                    /"/g,
                    '""'
                ) +
                '"';
        }


        return text;
    }


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


    // UTF-8 BOM for Excel
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
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href = url;


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
        `fleet-idle-report-${year}-${month}-${date}-${hours}${minutes}.csv`;


    document.body.appendChild(link);

    link.click();

    link.remove();


    setTimeout(() => {

        URL.revokeObjectURL(url);

    }, 1000);

}