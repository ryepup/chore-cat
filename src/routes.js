// @ngInject
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
      controllerAs: 'vm',
      resolve: {
        chore: function(chores, $stateParams) { return chores.fetch($stateParams.id); }
      }
    })
    .state('choreCat.settings', {
      url: '/settings',
      template: require('./settings.html'),
      controller: require('./settings.controller.js'),
      controllerAs: 'vm'
    })
    .state('choreCat.logs', {
      url: '/logs',
      template: require('./logs.html'),
      controller: require('./logs.controller.js'),
      controllerAs: 'vm'
    })
    .state('choreCat.about', {
      url: '/about',
      template: require('./about.html'),
      controller: require('./about.controller.js'),
      controllerAs: 'vm'
    })
  ;


  $urlRouterProvider.otherwise('/choreCat/chores');
};
