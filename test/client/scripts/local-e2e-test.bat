@echo off

REM Windows script for running e2e tests
REM Database will be recreated first, to ensure clean starting point for tests
REM You have to run server and capture some browser first
REM
REM Requirements:
REM - Path to mysql\bin specified in PATH environment variable
REM - NodeJS (http://nodejs.org/)
REM - Karma (npm install -g karma)

set BASE_DIR=%~dp0
set SQL_DIR=%BASE_DIR%..\..\..\database\local

mysql -u root -p%1 < %SQL_DIR%\ledita-web-app.sql
mysql -u root -p%1 < %SQL_DIR%\demo-data.sql

karma start "%BASE_DIR%\..\config\karma-e2e.conf.js" %*
