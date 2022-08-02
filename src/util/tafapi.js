const APIKey = "888d5c782c2c48e2a2e0215147";
const authHeader = {"X-API-KEY": APIKey};

const TAF = {
    byStation(stations,type){
        return fetch(`https://api.checkwx.com/${type}/${stations.join(',')}`, { headers: authHeader }).then((response) => {
                return response.json();
            })
    },
    parseMetar(inputString) {
        const inputArray = inputString.split(" ");
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
    },
    parseStations(inputString) {
        let processedString = inputString.toUpperCase().replace(/[^A-Z]/g,"");
        if(processedString.length%4 == 0 && processedString.length >= 4){
            const outputArray = [];
            for(let i = 0; i < (processedString.length) ; i +=4){
                outputArray.push(processedString.substring(i,i+4));
            }
            return outputArray
        } else {
            console.error(`parseStations() error: incorrect station format entered: ${inputString}`);
            return false;
        }
    }
}

export default TAF;