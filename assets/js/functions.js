export function formatTime(time) {
    let hour = time.getHours();
    if (hour < 10) hour = '0' + hour;

    let minute = time.getMinutes();
    if (minute < 10) minute = '0' + minute;

    return hour + ':' + minute;
}

function num2str(n, textForms) {
    n = Math.abs(n) % 100; let n1 = n % 10;
    if (n > 10 && n < 20) { return n + " " + textForms[2]; }
    if (n1 > 1 && n1 < 5) { return n + " " + textForms[1]; }
    if (n1 === 1) { return n + " " + textForms[0]; }
    return n + " " + textForms[2];
}

export function makeLastVisitDatetime(date) {
    let lastVisitTime = Math.trunc((new Date() - date)/1000); //seconds

    if(lastVisitTime < 60) return "только что";
    else lastVisitTime /= 60; // minutes

    if(lastVisitTime<60) return (
        num2str(Math.trunc(lastVisitTime), ["минута","минуты","минут"])
        + " " + "назад"
    );
    else lastVisitTime /= 60; // hours

    if(lastVisitTime<24) return (
        num2str(Math.trunc(lastVisitTime),["час", "часа", "часов"])
        + " " + "назад"
    );
    else return date.toLocaleDateString() + " " + formatTime(date);
}