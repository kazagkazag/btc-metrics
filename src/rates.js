const https = require("https");
const url = "https://bitbay.net/API/Public/BTCPLN/ticker.json";

function getRate(successCallback, errorCallback) {
    https.get(`${url}?${new Date().getTime()}`, httpRes => {
        httpRes.setEncoding("utf8");
        let responseText = "";
        httpRes.on("data", data => {
            responseText += data;
        });
        httpRes.on("end", () => {
            try {
                const responseJSON = JSON.parse(responseText);
                successCallback(responseJSON.average);
            } catch (e) {
                errorCallback(e);
            }
        });
    });
}

module.exports = {
    getRate
};
