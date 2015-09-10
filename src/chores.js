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

module.exports = function($q, $log, choreDb, firebaseChoreDb, settings) {
  var self = this;
  self.fetch = fetch;
  self.addActivity = addActivity;
  self.removeActivity = removeActivity;
  self.hasActivity = hasActivity;
  self.add = add;

  function db() {
    return settings.load().useFirebase ? firebaseChoreDb : choreDb;
  }

  function fetch(id) {
    if(id) {
      return db().byId(id).then(initialize);
    }
    return db().all().then(function(chores) {
      return chores.map(initialize);
    });
  }

  function addActivity(chore, who, when) {
    return db()
      .addActivity(chore.id, {
        who: who,
        when: moment(when).toISOString()
      })
      .then(initialize);
  }

  function removeActivity(chore, activity) {
    return db()
      .removeActivity(chore.id, activity)
      .then(function() {
        // update our local data
        _.pull(chore.activities, activity);
      });;
  }


  function hasActivity(chore, when) {
    var d = moment(when);
    return _.some(chore.activities, function(activity) {
      return d.isSame(activity.when, 'day');
    });
  }

  function add(chore) {
    return db().addChore(chore)
      .then(initialize);
  }
};
