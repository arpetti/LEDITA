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
set -- $mysqlpid
if [[ -z "$mysqlpid" ]]; then
	echo "Please start mysql then run this script again, goodbye."
	exit 1
fi

nodepid=`ps -ax | pgrep node`
set -- $nodepid
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

echo "Server test status is $serverTestStatus, Client test status is $clientUnitTestStatus"

# FIXME How to check if server already started?
# Start server
#NODE_ENV=dev node server.js > /dev/null &
#sleep 2

# TODO Investigate if possible to define e2e tests in package.json similar to client-test
# Run client side Angular-Karma end-to-end tests
#test/client/scripts/local-e2e-test.sh

# TODO Kill Server, but NODE, not RUBY
# http://stackoverflow.com/questions/6437602/shell-script-to-get-the-process-id-on-linux
#output=`ps -aux|grep r[u]by`
#set -- $output
#pid = $1
#kill $pid
#sleep 2
#kill -9 $pid >/dev/null 2>&1