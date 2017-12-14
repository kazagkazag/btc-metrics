const restify = require("restify");
const PORT = process.env.PORT || 5000;

const server = restify.createServer();

server.get("metrics", (req, res) => {
    res.send(200, "OK!");
});

server.listen(PORT, () => console.log(`Up and running on port ${PORT}`));
