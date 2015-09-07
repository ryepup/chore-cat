var moment = require('moment'),
    _ = require('lodash'),
    chores = [
      {id:1, name: 'vacuum', frequency: 14,
       activities: [
         {when: '2015-09-05', who: 'Ryan'}
       ]
      },
      {id:2, name: 'litterbox', frequency: 4, activities: [] },
      {id:3, name: 'dishes', frequency: 4,
       activities: [
         {when: '2015-08-02', who: 'Ryan'}
       ]}
    ],
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

module.exports = function($q, $log) {
  var self = this;
  self.fetch = fetch;
  self.addActivity = addActivity;
  self.hasActivity = hasActivity;

  function fetch(id) {
    if(id) {
      return $q.when(_(chores).where({id: parseInt(id)}).first());
    }
    return $q.when(chores.map(initialize));
  }

  function addActivity(chore, who, when) {
    chore.activities.push({
      who: who,
      when: moment(when).toISOString()
    });
    initialize(chore);
    return $q.when(chore);
  }

  function hasActivity(chore, when) {
    var d = moment(when);
    return _.some(chore.activities, function(activity) {
      return d.isSame(activity.when, 'day');
    });
  }
};
