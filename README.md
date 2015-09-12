# `chore-cat`

Helper for managing and tracking chores around the house. Intended for
use from phones, tablets, and desktops.

## Multiplayer setup

`chore-cat` has no central server, but you can setup a firebase.com
account to handle the small volume of your data.

1. create a [firebase][] account
1. in the `chore-cat` settings screen and set up your firebase URL
    * `chore-cat` writes all it's data under a `/chore-cat/` key, so you
      could re-use an existing firebase database if you've got one

### Security

By default, [firebase][] dbs are world readable/writable. There are many
ways to restrict access to firebase, but the simplest is:

1. in [firebase][] admin, add a new "secret"
1. in the `chore-cat` settings screen, copy in that as the
   [firebase][] token
1. in [firebase][] admin, change the security rules:

        {
            "rules": {
                ".read": "auth != null",
                ".write": "auth != null"
            }
        }

There are many ways to handle security and authentication with a
[firebase][] database; this method is pretty heavy handed, but
simple. The `chore-cat` token setting could also be a JWT.


[firebase]: https://www.firebase.com

## Development

* `npm install`
* `npm start`

## Implementation

`chore-cat` is a javascript application using the following
frameworks:

* [angularjs](https://angularjs.org/)
* [angular-bootstrap](https://github.com/angular-ui/bootstrap)
* [ui-router](https://github.com/angular-ui/ui-router)
* [browserify](http://browserify.org/)
* [firebase][] for multiplayer

### Data Model

* Chore
    * name
    * frequency (days)
    * activities
* Activity
    * who
    * when
