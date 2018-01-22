# Introduction

Btc-metrics application is responsible for serving metrics for Prometheus.
More details about metrics and Prometheus: https://prometheus.io/.

Application uses public API from bitbay.net (https://bitbay.net/pl/api-publiczne).

Application serves metrics in plain text format on `<HOST>:<PORT>/metrics` endpoint.

# Usage

## Local

1. Clone repo and run `npm install` to install all dependencies. Node in version 8.9 or grater is required.
2. Run `npm run dev` to start development server or...
3. Run `npm start` to start production server.
4. Open your browser and check `localhost:5000/metrics` url to see metrics.

## Production

Application is ready to use as docker container. You can simply use `./build_and_run_docker.sh` to build
docker image and run container on port 8080 (see `localhost:8080/metrics`).

You can also deploy application as part of the docker swarm using example service definition
from `docker-compose.yml`. Just build docker image (`docker build -t btc-metrics .`) 
and run `docker-compose up` to see working service.

```
version: '3.4'
services:
    btc-metrics:
        image: btc-metrics:latest
        ports:
            - 8080:5000
        environment:
            CRYPTO_CURRENCY: "BTC"
            CURRENCY: "PLN"
            INTERVAL: "10000"
```

# Configuration

There are few things you can configure using enviroment variables:

* `CRYPTO_CURRENCY` - which cryptocurrency you would like to track (default: "BTC")
* `CURRENCY` - real currency in which you would like to get rate (default: "PLN")
* `INTERVAL` - how often application should download rates in milliseconds (default: 60000 - 1 minute)

You can export any of those variables to customise application behavior.