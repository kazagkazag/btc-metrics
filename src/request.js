const https = require("https");

function request(url) {
    return new Promise((resolve, reject) => {
        https.get(url, httpRes => {

            httpRes.setEncoding("utf8");
            
            let responseText = "";
    
            httpRes.on("data", data => {
                responseText += data;
            });

            httpRes.on("error", error => {
                reject(error);
            })
    
            httpRes.on("end", () => {
                try {
                    const responseJSON = JSON.parse(responseText);
                    const rate = responseJSON.average;
                    console.log("Rate from API:", rate);
                    resolve(rate);
                } catch (error) {
                    reject(error);
                }
            });
        });
    })
}

module.exports = {
    request
};
