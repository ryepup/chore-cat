var angular = require('angular'),
    key = 'chore-cat.settings',
    defaultSettings = {
      useFirebase: false,
      logging: false,
      firebase: {}
    }
;

// @ngInject
module.exports = function($window, $timeout, config) {
  var self = this;
  self.load = load;
  self.save = save;

  var localStorage = $window.localStorage;


  function load() {
    var cfg = angular.fromJson(localStorage.getItem(key)) || defaultSettings;
    return angular.extend(config, cfg);
  };

  function save(settings) {
    return $timeout(function() {
      localStorage.setItem(key, angular.toJson(settings));
      return load();
    });
  };

};
