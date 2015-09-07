module.exports = function($rootScope) {
  var vm = this;
  vm.toggle = function() { vm.navbarCollapsed = !vm.navbarCollapsed; };

  close();
  $rootScope.$on('$stateChangeStart', close);

  function close() { vm.navbarCollapsed = true; };
};
