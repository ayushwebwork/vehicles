window.idleOver20 = window.fleetData.filter(vehicle => {

    const status = String(vehicle.status || "");

    const match = status.match(
        /^Idle since-\s*(\d+):(\d+):(\d+)$/
    );

    if (!match) {
        return false;
    }

    const hours = Number(match[1]);
    const minutes = Number(match[2]);
    const seconds = Number(match[3]);

    const idleSeconds =
        hours * 3600 +
        minutes * 60 +
        seconds;

    return idleSeconds > 1200;
});