#!/bin/bash

containerName="btc-metrics"

docker build -t "$containerName" .

docker stop "$containerName" > /dev/null || true
docker rm "$containerName" > /dev/null || true

docker run -p 8080:5000 --name "$containerName" \
    -e CRYPTO_CURRENCY -e CURRENCY -e INTERVAL \
    "$containerName"

