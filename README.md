# `chore-cat`

Helper for managing and tracking chores around the house. Intended for
use from android devices.

## Tech

`chore-cat` is in javascript, intended to be compiled to an android app.

* angularjs
* angular-bootstrap
* ui-router
* browserify
* cordova
* firebase.com for multiplayer

## Getting started

* `npm install`
* `npm start`

## Data Model

* Chore
    * name
    * frequency (days)
    * activities
* Activity
    * who
    * when

## Multiplayer setup

`chore-cat` has no central server, but you can setup a firebase.com
account to handle the small volume of your data.

1. create a firebase.com account
1. in the `chore-cat` settings screen and set up your firebase URL
    * `chore-cat` writes all it's data under a `/chore-cat/` key, so you
      could re-use an existing firebase database if you've got one

### Security

By default, firebase dbs are world readable/writable. There are many
ways to restrict access to firebase, but the simplest is:

1. in firebase admin, add a new "secret"
1. in the `chore-cat` settings screen, copy in that as the firebase
   token
1. in firebase admin, change the security rules:

        {
            "rules": {
                ".read": "auth != null",
                ".write": "auth != null"
            }
        }

There are many ways to handle security and authentication with a
firebase database; this method is pretty heavy handed, but simple. The
`chore-cat` token setting could also be a JWT.
