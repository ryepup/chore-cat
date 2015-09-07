module.exports = function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('choreCat', {
      url: '/choreCat',
      template: require('./index.html')
    })
    .state('choreCat.list', {
      url:'/chores',
      template: require('./list.html'),
      controller: require('./list.controller.js'),
      controllerAs: 'vm',
      resolve: {
        choreList: function(chores) { return chores.fetch(); }
      }
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
