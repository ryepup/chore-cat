module.exports = function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('choreCat', {
      url: '/choreCat',
      template: require('./index.html'),
      controller: require('./index.controller.js'),
      controllerAs: 'vm'
    })
    .state('choreCat.list', {
      url:'/chores',
      template: '[TABLE]'
    })
    .state('choreCat.add', {
      url: '/add',
      template: require('./add.html'),
      controller: require('./add.controller.js'),
      controllerAs: 'vm'
    })
    .state('choreCat.detail', {
      url: '/chores/:id',
      template: require('./detail.html'),
      controller: require('./detail.controller.js'),
      controllerAs: 'vm'
    })
  ;


  $urlRouterProvider.otherwise('/choreCat/chores');
};
