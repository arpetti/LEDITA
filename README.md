LEDITA
======

[![Build Status](https://travis-ci.org/arpetti/LEDITA.png?branch=master)](https://travis-ci.org/arpetti/LEDITA)

Ledita is a web app that supports the learning design practice among teachers of Italian as a second / foreign language.

Project Website: http://www.professoreitaliano.com


### Setup Instructions

* If you don't already have it, install [Node.js](http://nodejs.org/)
* Install Karma, you will need this to run the Angular unit and e2e (end to end) tests

    ```
    npm install -g karma
    ```

    Note: For Windows 64 bit, the default Karma Chrome launcher configuration points to the wrong location for Chrome.
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

### Running Tests
Before any pushes are made, please ensure all tests pass locally. Tests will also be run automatically on Travis after pushing.
The instructions below explain how to run server and client tests locally.

## Run Server Unit Tests

    Windows
    ```
    node_modules\.bin\mocha server\tests --recursive
    ```

    Linux/Mac
    ```
    make test
    ```

## <a name="rununit"/>Run Client Unit Tests    
Coming soon!

## <a name="rune2e"/>Run Client End To End Tests

* Start Karma with e2e test config (from project root)
    
    Windows
    ```
    test\client\scripts\e2e-test.bat
    ```

    Linux
    ```
    test/client/scripts/e2e-test.sh
    ```

## Debug End To End Tests
If you're having a test failure, you can insert a breakpoint to figure out what's going on.

* Insert the following line in any end to end test code

    ```
    pause();
    ```

* Follow instructions to [Run End To End Tests](#rune2e)

* Chrome browser will be launched to run tests, and when breakpoint is hit, will display the app at that point in time

* Click resume in the browser to continue the test