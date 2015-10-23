var moment = require('moment'),
    angular = require('angular'),
    _ = require('lodash')
;

// @ngInject
module.exports = function(chore, $log, chores, $state, config) {
  var vm = this;
  vm.chore = chore;
  vm.today = new Date();
  vm.doneToday = choreDone.bind(null, 0);
  vm.doneYesterday = choreDone.bind(null, -1);
  vm.doneOn = choreDone;
  vm.disabled = false;
  vm.showCalendar = false;
  vm.getDisabled = chores.hasActivity.bind(null, chore);
  vm.remove = remove;
  vm.save = chores.save.bind(null, chore);

  function choreDone(daysAgoOrDate) {
    if(angular.isNumber(daysAgoOrDate)){
      choreDone(moment().add(daysAgoOrDate, 'days'));
      return;
    }
    vm.disabled = true;
    chores.addActivity(vm.chore, config.username, daysAgoOrDate)
      .then(() => $state.go('choreCat.list'));
  };

  function remove(activity) {
    activity.pending = true;

    chores.removeActivity(chore, activity);
  }

};
