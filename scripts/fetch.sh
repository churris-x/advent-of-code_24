#!/bin/bash

# TODO(Fran): make a "-i" interactive flag to pass days, otherwise this script
# should just fetch the inputs for every folder that exists

# If no days are passed, prompt user
DAYS=$@;
if [ -z "$1" ]; then
    read -p 'Days: ' days
    DAYS=$days;
fi;

echo $DAYS |
tr ' ' '\n' |
xargs -I @ node --no-warnings utils/fetchInput.js @ 
