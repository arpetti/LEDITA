LEDITA
======

[![Build Status](https://travis-ci.org/arpetti/LEDITA.png?branch=master)](https://travis-ci.org/arpetti/LEDITA)

Ledita is a web app that supports the learning design practice among teachers of Italian as a second / foreign language.

Project Website: http://www.professoreitaliano.com


### Setup Instructions

* If you don't already have it, install [Node.js](http://nodejs.org/)
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

* Register with server side validation error

    * Follow instructions as for registering a new user, but enter a password with less than 5 characters


