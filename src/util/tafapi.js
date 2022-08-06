const APIKey = "888d5c782c2c48e2a2e0215147";
const authHeader = {"X-API-KEY": APIKey};

function ordinalDate(inputNumber) {
    inputNumber = Number(inputNumber);
    switch(inputNumber){
        case 1 || 21:
            return `${inputNumber}st`
        break;
        case 2 || 22:
            return `${inputNumber}nd`
        break;
        case 3 || 23:
            return `${inputNumber}rd`
        break;
        default:
            return `${inputNumber}th`
        break;
    }
}

function getNextForecastIndex(inputTaf) {
    const forecastBreaks = [/BECMG/, /TEMPO/, /FM\d{6}/];
    const breakIndexes = [];
    forecastBreaks.forEach((x) => {
        const breakIndex = inputTaf.search(x);
        if(breakIndex !== -1) {
            breakIndexes.push(breakIndex);
        }
    });
    console.log(breakIndexes);
    return breakIndexes.sort()[0];
}

const TAF = {
    byStation(stations,type){
        return fetch(`https://api.checkwx.com/${type}/${stations.join(',')}`, { headers: authHeader }).then((response) => {
                return response.json();
            })
    },
    parseStations(inputString) {
        let processedString = inputString.toUpperCase().replace(/[^A-Z]/g,"");
        if(processedString.length%4 === 0 && processedString.length >= 4){
            const outputArray = [];
            for(let i = 0; i < (processedString.length) ; i +=4){
                outputArray.push(processedString.substring(i,i+4));
            }
            return outputArray
        } else {
            console.error(`parseStations() error: incorrect station format entered: ${inputString}`);
            return false;
        }
    },
    parseMetar(inputString) {
        const inputArray = inputString.split(" ");
        const icao = inputArray.find((x) => {
            return (/[A-Z]{4}/).test(x);
        })
        const time = inputArray.find((x) => {
            return (/\d{6}Z/).test(x);
        })
        const processedTime = `${ordinalDate(time.slice(0,2))}, ${time.slice(2)}`;
        const wind = inputArray.find((x) => {
            return (/KT/).test(x);
        })
        const windVariation = inputArray.find((x) => {
            return (/\d{3}V\d{3}/).test(x);
        })
        const processedWind = `${wind.slice(0,3)}° ${wind.slice(3)} ${windVariation ? windVariation : ""}`;
        const visibility = inputArray.find((x) => {
            return (/SM/).test(x);
        })
        let cloud = inputArray.filter((x) => {
            return /(SKC)|(FEW)|(SCT)|(BKN)|(OVC)/.test(x);
        }).join(" ")
        let processedCloud = [];
        for(let i = 0; i < cloud.length ; i+=6){
            processedCloud.push(`${cloud.slice(i,i+6)}`);
        }
        const temp = inputArray.find((x) => {
            return (/\d\d\/\d\d/).test(x);
        })
        const pressure = inputArray.find((x) => {
            return (/A\d\d\d\d/).test(x);
        })
        return {
            icao:icao,
            time:processedTime,
            wind:processedWind,
            visibility:visibility,
            cloud:processedCloud,
            temp:temp,
            pressure:pressure
        }
    },
    // parseTaf(inputTaf) {
    //     let forecasts = [];
    //     for(i = 0; i < inputTaf.length;){
    //         const forecast = inputTaf.substring(i, getNextForecastIndex(inputTaf.slice(i)));
    //         console.log(forecast);
    //         forecasts.push(forecast);
    //     };
        
    // }
}

export default TAF;