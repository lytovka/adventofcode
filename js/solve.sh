#!/bin/bash

if [ -z "$1" ]; then
  echo "Year is required"
  exit 1
fi

if [ -z "$2" ]; then
  echo "Day is required"
  exit 1
fi

if [[ -z "$3" || ( "$3" -ne 1 && "$3" -ne 2 ) ]]; then
  echo "Part value of 1 or 2 is required"
  exit 1
fi

bash ./build.sh $1 $2 $3 && node ./dist/$1-day$2-part_$3.js
