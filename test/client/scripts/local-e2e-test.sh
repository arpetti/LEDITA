#!/bin/bash

BASE_DIR=`dirname $0`

echo ""
echo "Starting Karma Server (http://karma-runner.github.io)"
echo "-------------------------------------------------------------------"

# TODO: run the local db scripts

karma start $BASE_DIR/../config/karma-e2e.conf.js $*
