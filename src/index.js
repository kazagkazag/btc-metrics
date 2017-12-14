const restify = require("restify");
const { getRate } = require("./rates");
const { buildMetrics } = require("./metrics");

const PORT = process.env.PORT || 5000;

const server = restify.createServer();

server.get("metrics", (req, res) => {
    getRate(
        (rate) => {
            console.log("Serving rate", rate);
            res.send(200, buildMetrics(rate), {
                "Content-Type": "text/plain"
            });
        }, (error) => {
            console.log("Error occured", error);
            res.send(400, error);
        }
    );
});

server.listen(PORT, () => console.log(`Up and running on port ${PORT}`));
