//finds the first index of any of the forecastBreaks ignoring the first 8 characters
function getNextForecastIndex(inputTaf) {
    const forecastBreaks = [/BECMG/, /TEMPO/, /FM\d{6}/];
    const breakIndexes = [];
    forecastBreaks.forEach((x) => {
        const breakIndex = inputTaf.slice(8).search(x);
        if(breakIndex !== -1) {
            breakIndexes.push(breakIndex + 8);
        }
    });
    return breakIndexes.sort()[0];
}

function parseTaf(inputTaf) {
    let forecasts = [];
    for(i = 0; i < inputTaf.length;){
        const stringToProcess = inputTaf.slice(i);
        const nextForecastIndex = getNextForecastIndex(stringToProcess);
        const forecast = inputTaf.substring(i, nextForecastIndex);
        console.log(forecast);
        forecasts.push(forecast);
        //increments i to the next forecast break
        i += nextForecastIndex;
    };
    console.log(forecasts);
}

const testTaf = "TAF CYXU 052340Z 0600/0624 13005KT P6SM SCT030 BECMG VRB03KT 6SM BR BKN012 FM060800 VRB03KT 1SM BR OVC004 PROB30 0608/0613 1/4SM FG VV001 TEMPO 18008KT P6SM OVC012 FM061500 18010KT P6SM BKN025 RMK NXT FCST BY 060600Z"

parseTaf(testTaf);

/*
input string: "TAF CYXU 052340Z 0600/0624 13005KT P6SM SCT030 BECMG VRB03KT 6SM BR BKN012 FM060800 VRB03KT 1SM BR OVC004 PROB30 0608/0613 
1/4SM FG VV001 TEMPO 18008KT P6SM OVC012 FM061500 18010KT P6SM BKN025 RMK NXT FCST BY 060600Z"

expected output is [
    "TAF CYXU 052340Z 0600/0624 13005KT P6SM SCT030",
    "BECMG VRB03KT 6SM BR BKN012",
    "FM060800 VRB03KT 1SM BR OVC004 PROB30 0608/0613 1/4SM FG VV001"
    "TEMPO 18008KT P6SM OVC012"
    "FM061500 18010KT P6SM BKN025 RMK NXT FCST BY 060600Z"
    ]
*/