// @ngInject
module.exports = function($rootScope) {
  var vm = this;
  vm.toggle = () => vm.navbarCollapsed = !vm.navbarCollapsed;

  close();
  $rootScope.$on('$stateChangeStart', close);

  function close() { vm.navbarCollapsed = true; };
};
