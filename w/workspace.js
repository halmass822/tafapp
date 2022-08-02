const metar1 = "PHNL 250953Z 05007G17KT 10SM FEW024 FEW040 27/19 A3001 RMK AO2 SLP163 T02670194 403220261";
const metar2 = "CYGK 012300Z 17005KT 15SM FEW080 SCT250 25/21 A2977 RMK AC1CI3 SLP081 DENSITY ALT 1700FT";
const metar3 = "CYYZ 012346Z 22013G20KT 15SM SCT040 BKN070 BKN160 25/19 A2974 RMK SC3AC2AC2 SLP069 DENSITY ALT 2100FT";

function parseMetar(inputString) {
    inputArray = inputString.split(" ");
    const icao = inputArray.find((x) => {
        return (/[A-Z]{4}/).test(x);
    })
    const time = inputArray.find((x) => {
        return (/\d{6}Z/).test(x);
    })
    const wind = inputArray.find((x) => {
        return (/KT/).test(x);
    })
    const visibility = inputArray.find((x) => {
        return (/SM/).test(x);
    })
    const cloud = inputArray.filter((x) => {
        return /(SKC)|(FEW)|(SCT)|(BKN)|(OVC)/.test(x);
    })
    const temp = inputArray.find((x) => {
        return (/\d\d\/\d\d/).test(x);
    })
    const pressure = inputArray.find((x) => {
        return (/A\d\d\d\d/).test(x);
    })
    return {
        icao:icao,
        time:time,
        wind:wind,
        visibility:visibility,
        cloud:cloud,
        temp:temp,
        pressure:pressure
    }
}

console.log(parseMetar(metar1));
console.log(parseMetar(metar2));
console.log(parseMetar(metar3));