function getIdleVehicles(data) {

    if (!Array.isArray(data)) {
        return [];
    }

    const idleVehicles = data.filter(vehicle => {

        const status = String(
            vehicle.vehiclestatus ||
            vehicle.status ||
            ""
        ).trim().toLowerCase();

        return status.startsWith("idle");
    });

    // Sort by ward, then vehicle number
    idleVehicles.sort((a, b) => {

        const wardA = extractWardNumber(a.wardname);
        const wardB = extractWardNumber(b.wardname);

        if (wardA !== wardB) {
            return wardA - wardB;
        }

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

    return idleVehicles;
}


function extractWardNumber(ward) {

    const match = String(
        ward || ""
    ).match(/\d+/);

    return match
        ? parseInt(match[0], 10)
        : 999999;
}