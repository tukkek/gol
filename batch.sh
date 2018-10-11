#!/bin/bash -e
count=1
while [ 1 ]; do
    echo Generating video $count
    ((count++))
    nice ./generate.sh &> /dev/null
done
