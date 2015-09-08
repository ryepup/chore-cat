var moment = require('moment'),
    _ = require('lodash'),
    chores = [],
    OVERDUE = {}
;

function nextDue(chore) {
  if(!chore.last) return OVERDUE;

  var now = moment(),
      next = moment(chore.last.when).add(chore.frequency, 'days')
  ;
  return now.isAfter(next) ? OVERDUE : next;
}

function initialize(chore) {
  chore.activities = _.sortByOrder(chore.activities, ['when'], ['desc']);
  chore.last = _.first(chore.activities);
  chore.next = nextDue(chore);
  chore.isOverdue = chore.next === OVERDUE;
  return chore;
}

module.exports = function($q, $log, choreDb) {
  var self = this;
  self.fetch = fetch;
  self.addActivity = addActivity;
  self.hasActivity = hasActivity;
  self.add = add;

  function fetch(id) {
    if(id) {
      return choreDb.byId(id).then(initialize);
    }
    return choreDb.all().then(function(chores) {
      return chores.map(initialize);
    });
  }

  function addActivity(chore, who, when) {
    return choreDb
      .addActivity(chore.id, {who: who, when: when})
      .then(initialize);
  }

  function hasActivity(chore, when) {
    var d = moment(when);
    return _.some(chore.activities, function(activity) {
      return d.isSame(activity.when, 'day');
    });
  }

  function add(chore) {
    return choreDb.addChore(chore)
      .then(initialize);
  }
};
