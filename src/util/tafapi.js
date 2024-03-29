const APIKey = "";
const authHeader = {"X-API-KEY": APIKey};

function ordinalDate(inputNumber) {
    inputNumber = Number(inputNumber);
    switch(inputNumber){
        case 1 || 21:
            return `${inputNumber}st`
        case 2 || 22:
            return `${inputNumber}nd`
        case 3 || 23:
            return `${inputNumber}rd`
        default:
            return `${inputNumber}th`
    }
}

const TAF = {
    byStation(stations,type){
        return fetch(`https://api.checkwx.com/${type}/${stations.join(',')}`, { headers: authHeader }).then((response) => {
                return response = response.json().then((jsonResponse) => {
                    let output = []; 
                    stations.forEach((station) => {
                        let relatedReport = jsonResponse.data.find((x) => x.includes(station));
                        if(relatedReport) {
                            output.push(relatedReport);
                        }
                        })
                    return output;
                })
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
        const tafTime = inputArray.find((x) => {
            return (/\d{4}\/\d{4}/).test(x);
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
            return (/^\d\d\/\d\d/).test(x);
        })
        const pressure = inputArray.find((x) => {
            return (/A\d\d\d\d/).test(x);
        })
        let weather = inputArray.filter((x) => {
            return /BR|DZ|FZ|IC|RA|SN|VA|DR|FG|GR|MI|SA|SQ|VC|BC|DS|FC|GS|PL|SG|SS|UP|BL|DU|FU|HZ|PO|SH|TS|RE/g.test(x) && !(/[A-Z]{3}\d{3}/g.test(x))
        }).join(" ");
        if(icao) {
            weather = weather.replaceAll(icao,"");
        }
        const output = {
            icao:icao,
            time:processedTime,
            tafTime:tafTime,
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
            output.forecastRemarks = inputTaf.substring(remarksIndex);
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
