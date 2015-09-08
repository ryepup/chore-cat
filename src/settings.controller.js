module.exports = function(choreDb) {
  var vm = this;

  vm.save = save;
  vm.settings = choreDb.settings;

  function save() {
    choreDb.persist();
  }
};
