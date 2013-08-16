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
SQL_DIR=$BASE_DIR

echo ""
echo "Creating database..."
echo "-------------------------------------------------------------------"
mysql -u root < $SQL_DIR/ledita-web-app.sql

echo ""
echo "Populating database..."
echo "-------------------------------------------------------------------"
mysql -u root < $SQL_DIR/demo-data.sql

echo ""
echo "Done"
echo "-------------------------------------------------------------------"
