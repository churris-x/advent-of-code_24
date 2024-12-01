#!/bin/bash

DAY=$1
if [ -z "$1" ]; then
    read -p 'Day: ' day
    DAY=$day;
fi;

mkdir $DAY || exit 
cp utils/template.js $DAY/solution.js
sh scripts/fetch.sh $DAY
