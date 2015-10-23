var angular = require('angular')
;

// @ngInject
module.exports = function(firebaseChoreDb, settings, $log, $q) {
  var vm = this;

  vm.save = save;
  vm.settings = settings.load();
  vm.connection = firebaseChoreDb.connection;
  vm.allowScan = false;
  vm.scan = scan;
  checkFirebase();
  checkForScanner();

  function save() {
    var p = settings.save(vm.settings);
    if(vm.settings.useFirebase) p.then(checkFirebase);
  }

  function checkFirebase() {
    if(vm.settings.firebase.url){
      firebaseChoreDb.connect(vm.settings.firebase);
    }
  }

  function checkForScanner() {
    vm.allowScan = window.cordova && window.cordova.plugins.barcodeScanner;
  }

  function scan() {
    $q(window.cordova.plugins.barcodeScanner.scan)
      .then(function(result) {
        vm.settings.firebase = angular.fromJson(result.text);
        checkFirebase();
      });
  }
};
