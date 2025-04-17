#!/bin/bash

set -e

start=$SECONDS

printf "\nprepare .nuxt directory...\n"
npm run dev:prepare

printf "\nlint check...\n"
npm run lint

duration=$(( SECONDS - start ))

printf "\n\nFinished build in $duration seconds.\n\n"
