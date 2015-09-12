var angular = require('angular'),
    key = 'chore-cat.settings',
    defaultSettings = {
      useFirebase: false,
      firebase: {}
    }
;

module.exports = function($window, $timeout) {
  var self = this;
  self.load = load;
  self.save = save;

  var localStorage = $window.localStorage;


  function load() {
    return angular.fromJson(localStorage.getItem(key)) || defaultSettings;
  };

  function save(settings) {
    return $timeout(function() {
      localStorage.setItem(key, angular.toJson(settings));
      return settings;
    });
  };

};
