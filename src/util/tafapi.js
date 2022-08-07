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
        const timeFrame = inputArray.find((x) => {
            return (/\d{4}\d{4}/).test(x);
        })
        const forecastPrepend = inputArray.find((x) => {
            return (/BECMG|TEMPO|FM\d{6}|PROB\d\d|TAF/g).test(x);
        })
        const processedTime = time ? `${ordinalDate(time.slice(0,2))}, ${time.slice(2)}` : "";
        const wind = inputArray.find((x) => {
            return (/KT/).test(x);
        })
        const windVariation = inputArray.find((x) => {
            return (/\d{3}V\d{3}/).test(x);
        })
        const processedWind = wind ? `${wind.slice(0,3)}° ${wind.slice(3)} ${windVariation ? windVariation : ""}` : "";
        const visibility = inputArray.find((x) => {
            return (/SM/).test(x);
        })
        let cloud = inputArray.filter((x) => {
            return /(SKC)|(FEW)|(SCT)|(BKN)|(OVC)|VV/.test(x);
        }).join(" ")
        const temp = inputArray.find((x) => {
            return (/\d\d\/\d\d/).test(x);
        })
        const pressure = inputArray.find((x) => {
            return (/A\d\d\d\d/).test(x);
        })
        const weather = inputArray.filter((x) => /BR|DZ|FZ|IC|RA|SN|VA|DR|FG|GR|MI|SA|SQ|VC|BC|DS|FC|GS|PL|SG|SS|UP|BL|DU|FU|HZ|PO|SH|TS|RE/g.test(x)).join(" ");
        const output = {
            icao:icao,
            time:processedTime,
            timeFrame:timeFrame,
            forecastPrepend:forecastPrepend,
            wind:processedWind,
            visibility:visibility,
            cloud:cloud,
            temp:temp,
            pressure:pressure,
            weather:weather
        }
        return output;
    },
    parseTaf(inputTaf) {
        const forecastTime = inputTaf.match(/\d{6}Z/);
        const processedForecastTime = forecastTime[0] ? `${ordinalDate(forecastTime[0].slice(0,2))}, ${forecastTime[0].slice(2)}` : "";
        let output = {
            icao: inputTaf.match(/[A-Z]{4}/),
            forecastTime: processedForecastTime,
            forecasts: [],
        };
        const remarksIndex = inputTaf.search(/RMK/);
        if(remarksIndex !== -1) {
            output.forecastRemarks = inputTaf.substring(remarksIndex)
            console.log(`${output.forecastRemarks} spliced out`);
            inputTaf = inputTaf.substring(0,remarksIndex);
        }
        const tafArrays = inputTaf.replaceAll(/BECMG|TEMPO|FM\d{6}|PROB\d\d/g, (match) => {
            return '|' + match
        }).split('|');
        tafArrays.forEach((x) => output.forecasts.push(TAF.parseMetar(x)));
        return output;
    }
}

export default TAF;