var moment = require('moment'),
    angular = require('angular')
;

module.exports = function(chore, $log, chores, $state) {
  var vm = this;
  vm.chore = chore;
  vm.today = new Date();
  vm.doneToday = choreDone.bind(null, 0);
  vm.doneYesterday = choreDone.bind(null, -1);
  vm.doneOn = choreDone;
  vm.disabled = false;
  vm.showCalendar = false;
  vm.getDisabled = function(date) { return chores.hasActivity(chore, date); };

  function choreDone(daysAgoOrDate) {
    if(angular.isNumber(daysAgoOrDate)){
      choreDone(moment().add(daysAgoOrDate, 'days'));
      return;
    }
    vm.disabled = true;
    chores.addActivity(vm.chore, 'Ryan', daysAgoOrDate).then(function() {
      $state.go('choreCat.list');
    });
  };
};
