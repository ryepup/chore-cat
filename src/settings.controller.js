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
    firebaseChoreDb.connect(vm.settings.firebase);
  }
};
