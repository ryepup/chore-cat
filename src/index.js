// browserify entrypoint

var angular = require('angular'),
    ngUiRouter = require('angular-ui-router'),
    ngBootstrap = require('angular-bootstrap'),
    smartTable = require('angular-smart-table'),
    angularQrCode = require('angular-qrcode')
;
// `angular-qrcode` needs this global
window.qrcode = require('qrcode-generator');

require('./style.css');

angular
  .module('choreCat', ['ui.router', 'ui.bootstrap', 'smart-table',
                       'monospaced.qrcode'])
  .config(require('./routes.js'))
  .component('choreCat', {
    template: '<div ui-view>Loading...</div>'
  })
  .service('choreDb', require('./choreDb.service.js'))
  .service('firebaseChoreDb', require('./firebaseChoreDb.service.js'))
  .service('chores', require('./chores.js'))
  .service('settings', require('./settings.service.js'))
  .filter('fromNow', require('./fromNow.filter.js'))
  .value('config', {})
  .value('logs', [])
  .decorator('$log', require('./log.decorator.js'))
  .run(startup)
;

// @ngInject
function startup(settings, firebaseChoreDb, config) {
  angular.extend(config, settings.load());
  if(config.useFirebase){
    firebaseChoreDb.connect(config.firebase);
  }
}
