#!/bin/bash

set -e

start=$SECONDS

printf "\nlint check all components...\n"
npm run lint

duration=$(( SECONDS - start ))

printf "\n\nFinished build in $duration seconds.\n\n"
