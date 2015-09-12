// browserify entrypoint

var angular = require('angular'),
    ngUiRouter = require('angular-ui-router'),
    ngBootstrap = require('angular-bootstrap'),
    smartTable = require('angular-smart-table');

require('./style.css');

angular
  .module('choreCat', ['ui.router', 'ui.bootstrap', 'smart-table'])
  .config(require('./routes.js'))
  .directive('choreCat', require('./choreCat.directive.js'))
  .service('choreDb', require('./choreDb.service.js'))
  .service('firebaseChoreDb', require('./firebaseChoreDb.service.js'))
  .service('chores', require('./chores.js'))
  .service('settings', require('./settings.service.js'))
  .filter('fromNow', require('./fromNow.filter.js'))
  .run(function(settings, firebaseChoreDb) {
    var config = settings.load();
    if(config.useFirebase){
      firebaseChoreDb.connect(config.firebase, config.firebaseToken);
    }
  })
;
