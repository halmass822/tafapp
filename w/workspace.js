const string1 = "CYGK CYXU CYYZ";
const string2 = "CYGK,CYXU,CYYZ";
const string3 = "CYGK, CYXU, CYYZ";
const string4 = "CYGK/CYXU/CYYZ";
const string5 = "CYGK/ CYXU/ CYYZ";
const string6 = "CYGK-CYXU-CYYZ";
const string7 = "CYGK- CYXU- CYYZ";
const testStrings = [string1,string2,string3,string4,string5,string6,string7];


function parseStations(inputString) {
    let processedString = inputString.toUpperCase().replace(/[^A-Z]/g,"");
    if(processedString.length%4 == 0 && processedString.length >= 4){
        const outputArray = [];
        for(i = 0; i < (processedString.length) ; i +=4){
            outputArray.push(processedString.substring(i,i+4));
        }
        return outputArray
    } else {
        console.error(`parseStations() error: incorrect station format entered: ${inputString}`);
        return false;
    }
}

testStrings.forEach((x) => console.log(parseStations(x)));