var angular = require('angular')
;
module.exports = function(firebaseChoreDb, settings, $log) {
  var vm = this;

  vm.save = save;
  vm.settings = settings.load();
  vm.connection = firebaseChoreDb.connection;
  checkFirebase();

  function save() {
    settings.save(vm.settings)
      .then(checkFirebase);
  }

  function checkFirebase() {
    if(vm.settings.firebase.url){
      firebaseChoreDb.connect(vm.settings.firebase);
    }
  }
};
