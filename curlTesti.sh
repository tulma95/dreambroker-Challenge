#!/bin/bash
curl --header "Content-Type: application/json" \
             --request POST \
             --data '{"text":"hello2 times "}' \
 localhost:3000/analyze

