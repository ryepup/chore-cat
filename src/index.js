// browserify entrypoint

var angular = require('angular'),
    ngUiRouter = require('angular-ui-router'),
    ngBootstrap = require('angular-bootstrap');

angular
  .module('choreCat', ['ui.router', 'ui.bootstrap'])
  .config(require('./routes.js'))
  .directive('choreCat', require('./choreCat.directive.js'))
  .service('chores', require('./chores.js'))
  .filter('fromNow', require('./fromNow.filter.js'))

;
