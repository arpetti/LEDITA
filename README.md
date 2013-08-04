LEDITA
======

[![Build Status](https://travis-ci.org/arpetti/LEDITA.png?branch=master)](https://travis-ci.org/arpetti/LEDITA)

Ledita is a web app that supports the learning design practice among teachers of Italian as a second / foreign language.

Project Website: http://www.professoreitaliano.com


## <a name="setupInstructions" />Setup Instructions

* Install [MySQL 5.5.24](http://downloads.mysql.com/archives.php?p=mysql-5.5&v=5.5.24)

* Connect to mysql as root and run the following scripts to create the database, user, and populate sample data

    ```
    mysql -u root
    source database\local\ledita-web-app.sql
    source database\local\demo-data.sql
    source database\local\user.sql
    ```    

    For Mac or Linux, switch the ```\``` to ```/```

    Add mysql bin to your PATH, this is required for running e2e tests. 
    For Windows, add for example ```C:\Program Files\MySQL\MySQL Server 5.5\bin``` to the ```PATH``` environment variable.
    For Mac/Linux, edit your ```~.bash_profile```, for example ```export PATH=/usr/local/mysql/bin:$PATH```

* If you don't already have it, install [Node.js](http://nodejs.org/)

* Install [node-gyp](https://github.com/TooTallNate/node-gyp), this is a required dependency for [bcrypt](https://github.com/ncb000gt/node.bcrypt.js/) which is used by this project for password hashing.

    ```
    npm install -g node-gyp
    ```

    For Mac, use ```sudo```

* Install other required dependencies for [bcrypt](https://github.com/ncb000gt/node.bcrypt.js/)

    * Max OS X

        * Install XCode 

        * Open XCode, start a project (it doesn't matter what kind), then select Preferences -> Downloads -> Install Command Line Tools

    * Windows 7 64 bit: Estimated total installation time ~2 hours

        * Install [Python 2.7.3](http://www.python.org/download/releases/2.7.3/#download)

        * Install [Microsoft Visual Studio C++ 2010 Express](http://go.microsoft.com/?linkid=9709949)

        * Install [Windows 7 64-bit SDK](http://www.microsoft.com/en-us/download/details.aspx?id=8279)

        * Install [Compiler update for the Windows SDK 7.1](http://www.microsoft.com/en-us/download/details.aspx?id=4422)

        * Install [Microsoft Visual Studio C++ 2012 for Windows Desktop](http://go.microsoft.com/?linkid=9816758)

        * Install [Win64 OpenSSL v1.0.1e](http://slproweb.com/products/Win32OpenSSL.html)

        * Add Python and OpenSSL paths to PATH environment variable, for example

        ```
        C:\app\Python27;C:\OpenSSL-Win64\bin
        ```

    * Other environments

        * See README's for [bcrypt](https://github.com/ncb000gt/node.bcrypt.js/) and [node-gyp](https://github.com/TooTallNate/node-gyp)

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

* Optionally, install Chrome Extension [AngularJS Batarang](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk/related?hl=en)

* Clone this repo and cd to project directory, then run

    ```
    npm install
    ```
    
    For Windows, set Visual Studio version first, before running npm install
    
    ```
    SET VisualStudioVersion=11.0
    ```
    
* From project root directory, run

    ```
    node server.js
    ```

* Browse to [http://localhost:8000](http://localhost:8000)

* Login using any of the [demo users](database/local/demo-data.sql)

    * username is the email address
    * passw0rD

## Running Tests

Before any pushes are made, please ensure all tests pass locally. Tests will also be run automatically on Travis after pushing. The instructions below explain how to run server and client tests locally.
 
### Run Server Tests

    ```
    npm test    
    ```

This runs unit and DAO tests. If you have any DAO tests failing locally, reset your database by running the sql scripts as described in the [Setup Instructions](#setupInstructions). A more ideal solution would be to have a separate test database schema used only by the local tests, together with an automated process that recreates and populates the database prior to each test run. That way work done in the local database would not interfere with the test database and vice versa. A developer should look into this when there's time.

### <a name="rununit"/>Run Client Unit Tests    

Not implemented yet.

### <a name="rune2e"/>Run Client End To End Tests

* Start Karma with e2e test config (from project root)

    The e2e tests are also dependent on the database. 
    To ensure a clean start each time, the database is reset prior to the e2e test run. 
    For Windows, the script assumes you have a mysql root user password set. 
    For example, if your mysql root password is ```catswillruletheworld```, then run the script as follows
    
    Windows
    ```
    test\client\scripts\local-e2e-test.bat catswillruletheworld
    ```

    For Mac or Linux, the script assumes no mysql root user password is set.

    Mac or Linux
    ```
    test/client/scripts/local-e2e-test.sh
    ```

### Debug End To End Tests

If you're having a test failure, you can insert a breakpoint to figure out what's going on.

* Insert the following line in any end to end test code

    ```
    pause();
    ```

* Follow instructions to [Run End To End Tests](#rune2e)

* Chrome browser will be launched to run tests, and when breakpoint is hit, will display the app at that point in time

* Click resume in the browser to continue the test