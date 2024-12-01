#!/bin/bash

# TODO(Fran): Add some ascii title?

# Ask to confirm before continuing
read -p 'To fetch each puzzle input your auth token is needed, do you want to save it to .env? [y/n]: ' yn 
case $yn in 
    [Yy]* ) break;;
    * ) exit;;
esac

# Put user auth token in env file
read -p 'AUTH_TOKEN=' token
echo AUTH_TOKEN=$token > .env
