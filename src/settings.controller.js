var angular = require('angular')
;
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
    settings.save(vm.settings)
      .then(checkFirebase);
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
    $q(function(resolve, reject) {
      window.cordova.plugins.barcodeScanner.scan(resolve, reject);
    }).then(function(result) {
      vm.settings.firebase = angular.fromJson(result.text);
      checkFirebase();
    });
  }
};
