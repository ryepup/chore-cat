// @ngInject
module.exports = function(chores, $state) {
  var vm = this;
  vm.chore = {};
  vm.add = function() {
    chores.add(vm.chore)
      .then(onSave);
  };

  function onSave(chore) {
    $state.go('choreCat.detail', {id: chore.id});
  }
};
