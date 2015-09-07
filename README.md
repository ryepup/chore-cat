# chore-cat

Helper for managing and tracking chores around the house. Intended for
use from android devices.

## Tech

`chore-cat` is in javascript, compiled to android using cordova.

* angularjs
* angular-bootstrap
* ui-router
* browserify
* shared server for data (?)

## Getting started

* `npm install`
* `npm run start`

## Model

* Chore
    * name
    * frequency
    * activities
* Activity
    * who
    * when
