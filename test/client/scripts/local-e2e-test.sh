#!/bin/bash

#####################################################################################
#  This script assumes you have path to mysql executable in your .bash_profile
#  If you don't, add the following line, replacing /usr/local/mysql/bin
#  with path to your mysql install if its in a different location.
#
#      export PATH=/usr/local/mysql/bin:$PATH
#
######################################################################################


BASE_DIR=`dirname $0`
SQL_DIR=$BASE_DIR/../../../database/local

echo ""
echo "Recreating database..."
echo "-------------------------------------------------------------------"
mysql -u root < $SQL_DIR/ledita-web-app.sql
mysql -u root < $SQL_DIR/demo-data.sql

echo ""
echo "Starting Karma Server (http://karma-runner.github.io)"
echo "-------------------------------------------------------------------"
karma start $BASE_DIR/../config/karma-e2e.conf.js $*
