const restify = require("restify");
const { getRate, startCollectingRates } = require("./rates");
const { buildMetrics } = require("./metrics");

const PORT = process.env.PORT || 5000;
const CRYPTO_CURRENCY = process.env.CRYPTO_CURRENCY || "BTC";
const CURRENCY = process.env.CURRENCY || "PLN"
const INTERVAL = process.env.INTERVAL ? parseInt(process.env.INTERVAL) : 1000 * 60;

const server = restify.createServer();

startCollectingRates(CRYPTO_CURRENCY, CURRENCY, INTERVAL);
bindRequestHandler();
startListening();

function bindRequestHandler() {
    server.get("metrics", (req, res) => {
        getRate()
            .then(rate => {
                console.log("Serving rate:", rate);
                res.send(200, buildMetrics(rate), {
                    "Content-Type": "text/plain"
                });
            })
            .catch(error => {
                console.log("Error while responding:", error);
                res.send(400, error);
            });
    });
}

function startListening() {
    server.listen(PORT, () => console.log(`Up and running on port ${PORT}`));
}