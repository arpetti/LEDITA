LEDITA
======

[![Build Status](https://travis-ci.org/arpetti/LEDITA.png?branch=master)](https://travis-ci.org/arpetti/LEDITA)

Ledita is a web app that supports the learning design practice among teachers of Italian as a second / foreign language.

Project Website: http://www.professoreitaliano.com


## <a name="setupInstructions" />Setup Instructions

* Install [MySQL 5.5.24](http://downloads.mysql.com/archives.php?p=mysql-5.5&v=5.5.24)
* Connect to mysql as root and run the following scripts to create the database, user, and populate sample data

    ```
    source %PROJECT_ROOT%\LEDITA\database\local\ledita-web-app.sql
    source %PROJECT_ROOT%\LEDITA\database\local\demo-data.sql
    source %PROJECT_ROOT%\LEDITA\database\local\user.sql
    ```    

* If you don't already have it, install [Node.js](http://nodejs.org/)
* Install Karma, you will need this to run the Angular unit and e2e (end to end) tests

    ```
    npm install -g karma
    ```

    For Mac, use ```sudo```

    For Windows 64 bit, the default Karma Chrome launcher configuration points to the wrong location for Chrome.
    Fix it by modifying the following file (check your environment variable for value of PATH)

    ```
    %PATH%\node_modules\karma\lib\launchers\Chrome.js
    ```

    Original line

    ```
    win32: process.env.LOCALAPPDATA + '\\Google\\Chrome\\Application\\chrome.exe'
    ```

    Change it to

    ```
    win32: process.env.ProgramFiles + ' (x86)\\Google\\Chrome\\Application\\chrome.exe'
    ```
* Clone this repo and cd to project directory, then run

    ```
    npm install
    ```
    
* From project root directory, run

    ```
    node server.js
    ```

* Browse to [http://localhost:8000](http://localhost:8000)

* Login using one of the predefined users

    ```
    user@test.com/123
    admin@test.com/456
    ```

* Logout from dropdown menu under avatar image

* Register a new user

    * Name can be anything (not used yet)
    * Surname can be anything (not used yet)
    * Email is used as the username, enter a valid format (eg: user1@test.com)
    * Password must be at least 5 characters
    * Retype password can be anything (not used yet)
    * Check or uncheck terms & conditions (not used yet)


## Running Tests

Before any pushes are made, please ensure all tests pass locally. Tests will also be run automatically on Travis after pushing. The instructions below explain how to run server and client tests locally.
 
### Run Server Tests

    ```
    npm test    
    ```

This runs unit and DAO tests. If you have any DAO tests failing locally, reset your database by running the sql scripts as described in the [Setup Instructions](#setupInstructions). A more ideal solution would be to have a separate test database schema used only by the local tests, together with an automated process that recreates and populates the database prior to each test run. That way work done in the local database would not interfere with the test database and vice versa. A developer should look into this when there's time.

### <a name="rununit"/>Run Client Unit Tests    

Not implemented yet, but should be soon.

### <a name="rune2e"/>Run Client End To End Tests

* Start Karma with e2e test config (from project root)
    
    Windows
    ```
    test\client\scripts\e2e-test.bat
    ```

    Linux
    ```
    test/client/scripts/e2e-test.sh
    ```

The e2e tests are also dependent on the database. If you have any local failures, reset your database by running the sql scripts as described in the [Setup Instructions](#setupInstructions).

### Debug End To End Tests

If you're having a test failure, you can insert a breakpoint to figure out what's going on.

* Insert the following line in any end to end test code

    ```
    pause();
    ```

* Follow instructions to [Run End To End Tests](#rune2e)

* Chrome browser will be launched to run tests, and when breakpoint is hit, will display the app at that point in time

* Click resume in the browser to continue the test