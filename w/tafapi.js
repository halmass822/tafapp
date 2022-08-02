const APIKey = "888d5c782c2c48e2a2e0215147";
const authHeader = JSON.stringify(`X-API-KEY: ${APIKey}`);

const TAF = {
    byStation(stations){
        fetch(`https://api.checkwx.com/taf/${stations,join(',')}`, {
                headers: {"X-API-KEY:": APIKey}
            }).then((response) => {
                console.log(response);
            })
        }
}