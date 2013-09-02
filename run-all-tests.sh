#!/bin/bash

#####################################################################################
#  
# 	This script is for local development only. It runs all tests including:
#
#  	 * server side unit, dao, and integration tests
#  	 * client side unit tests
#	 * client side end to end tests
#
#	The MySQL database must be running for this to work.
#
######################################################################################

mysqlpid=`ps -ax | pgrep mysql`
if [[ -z "$mysqlpid" ]]; then
	echo "Please start mysql then run this script again, goodbye."
	exit 1
fi

nodepid=`ps -ax | pgrep node`
if [[ -n "$nodepid" ]]; then
	echo "Node web server already running at pid: $nodepid, killing..."
	kill $nodepid
	sleep 2
fi

echo "Running server side unit, dao, and integration tests..."
npm test
serverTestStatus=$?

echo "Running client side unit tests..."
npm run-script client-test
clientUnitTestStatus=$?

echo "Recreating database in preparation for end to end tests..."
database/local/create-db.sh

echo "Starting node web server..."
NODE_ENV=dev node server.js > /dev/null &
sleep 2

echo "Running client side end to end tests..."
npm run-script client-e2e-test
clientE2ETestStatus=$?

echo "Stopping node web server..."
nodepid=`ps -ax | pgrep node`
if [[ -n "$nodepid" ]]; then
	kill $nodepid
	sleep 2
fi

echo "Server test status is $serverTestStatus"
echo "Client unit test status is $clientUnitTestStatus"
echo "Client e2e test status is: $clientE2ETestStatus"

if [[ $serverTestStatus != 0 ]] || [[ $clientUnitTestStatus != 0 ]] || [[ $clientE2ETestStatus != 0 ]]; then
	echo "ERROR: There were test failures"
	exit 1
else
	echo "SUCCESS: All tests passed"
fi
exit 0


#FUTURE if node webserver doesn't die, kill again with -9
#kill $pid
#sleep 2
#kill -9 $pid >/dev/null 2>&1