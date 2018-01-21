const { request } = require("./request");

let rate;

function startCollectingRates(cryptoCurrency, currency, interval) {
    collectRate(cryptoCurrency, currency);
    setInterval(() => collectRate(cryptoCurrency, currency), interval);
}

function collectRate(cryptoCurrency, currency) {
    console.log("Collecting rate...");

    request(`${getRateUrl(cryptoCurrency, currency)}?${new Date().getTime()}`)
        .then(response => rate = response)
        .catch(error => console.log(error));
}

function getRate(successCallback, errorCallback) {
    return new Promise((resolve, reject) => {
        if (rate) {
            resolve(rate);
        } else {
            reject(new Error("No rate available. See logs for more details."));
        }
    });
}

function getRateUrl(cryptoCurrency, currency) {
    return `https://bitbay.net/API/Public/${cryptoCurrency}${currency}/ticker.json`;
}

module.exports = {
    getRate,
    startCollectingRates
};
