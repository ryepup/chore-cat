// browserify entrypoint

var angular = require('angular'),
    ngUiRouter = require('angular-ui-router'),
    ngBootstrap = require('angular-bootstrap');

module.exports = angular
  .module('chore-cat', ['ui.bootstrap', 'ui.router'])
;
