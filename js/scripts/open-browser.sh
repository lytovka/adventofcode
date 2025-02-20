#!/bin/bash

if [ -z "$1" ]; then
  echo "Year is required"
  exit 1
fi

if [ -z "$2" ]; then
  echo "Day is required"
  exit 1
fi

open "https://adventofcode.com/$1/day/$2"
