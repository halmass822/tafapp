function getNextForecastIndex(inputTaf) {
    const forecastBreaks = [/BECMG/, /TEMPO/, /FM\d{6}/];
    const breakIndexes = [];
    forecastBreaks.forEach((x) => {
        const breakIndex = inputTaf.slice(8).search(x);
        if(breakIndex !== -1) {
            breakIndexes.push(breakIndex);
        }
    });
    console.log(breakIndexes);
    return breakIndexes.sort()[0];
}

function parseTaf(inputTaf) {
    let forecasts = [];
    for(i = 0; i < inputTaf.length;){
        const nextForecastIndex = getNextForecastIndex(inputTaf.slice(i));
        const forecast = inputTaf.substring(i, nextForecastIndex);
        console.log(forecast);
        forecasts.push(forecast);
        i += nextForecastIndex;
    };
    console.log(forecasts);
}

const testTaf = "TAF CYXU 052340Z 0600/0624 13005KT P6SM SCT030 FM060600 VRB03KT 6SM BR BKN012 FM060800 VRB03KT 1SM BR OVC004 PROB30 0608/0613 1/4SM FG VV001 FM061300 18008KT P6SM OVC012 FM061500 18010KT P6SM BKN025 RMK NXT FCST BY 060600Z"

parseTaf(testTaf);