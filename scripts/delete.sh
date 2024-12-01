#!/bin/bash

# If no days are passed, prompt user
DAYS=$@;
if [ -z "$1" ]; then
    read -p 'Days: ' days
    DAYS=$days;
fi;

# Ask to confirm before continuing
read -p 'Are you sure? [y/n]: ' yn 
case $yn in 
    [Yy]* ) break;;
    * ) exit;;
esac

eval echo $DAYS |
tr ' ' '\n' |
xargs -I @ rm -v @/input.txt
