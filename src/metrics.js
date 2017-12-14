function buildMetrics(rate) {
    return "# HELP btc_price_in_pln Current BTC price in PLN.\n" +
    "# TYPE btc_price_in_pln gauge\n" +
    "btc_price_in_pln " + rate + "\n"
}

module.exports = {
    buildMetrics
};
