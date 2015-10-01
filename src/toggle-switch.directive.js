var defaults = {
  class: '',
  onClass: 'btn-primary',
  offClass: 'btn-default'
},
    angular = require('angular')
;

// @ngInject
function ToggleSwitchController($attrs) {
  var vm = this,
      opts = angular.extend({}, defaults, $attrs);

  vm.set = function(value) { vm.ngModel = value; };
  vm.cssClasses = function(value) {
    var active= vm.ngModel === value,
        classes = {active: active};

    classes[opts.class] = true;
    classes[opts.onClass] = active;
    classes[opts.offClass] = !active;

    return classes;
  };
}

// @ngInject
module.exports = function() {
  return {
    restrict: 'EA',
    template: require('./toggle-switch.html'),
    scope: {ngModel: '='},
    controller: ToggleSwitchController,
    controllerAs: 'vm',
    bindToController: true
  };
};
