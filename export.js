function exportToExcel() {

    const data = window.idleOver20;

    if (!data || data.length === 0) {
        alert("No vehicles idle for more than 20 minutes.");
        return;
    }

    const headers = [
        "Vehicle",
        "Vehicle ID",
        "Idle Time",
        "Driver",
        "Ward",
        "Route",
        "Speed",
        "Time"
    ];

    const rows = data.map(vehicle => [

        vehicle.vehicleno || "",

        vehicle.vehicleid || "",

        String(vehicle.status || "")
            .replace(/^Idle since-\s*/, ""),

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
            `"${String(value).replace(/"/g, '""')}"`
        ).join(",")
    )
    .join("\r\n");

    const blob = new Blob(
        ["\uFEFF" + csv],
        {
            type: "text/csv;charset=utf-8;"
        }
    );

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;

    link.download =
        "Idle_Vehicles_Over_20_Minutes.csv";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
}