var moment = require('moment'),
    _ = require('lodash'),
    OVERDUE = {},
    Chore = { OVERDUE: OVERDUE };

Chore.nextDue = function(chore, asOf) {
  if(!chore.last) return OVERDUE;

  var now = moment(asOf),
      next = moment(chore.last.when).add(chore.frequency, 'days');

  return now.isAfter(next) ? OVERDUE : next;
};

Chore.create = function(chore) {
  chore.activities = _.sortByOrder(chore.activities, ['when'], ['desc']);
  chore.last = _.first(chore.activities);
  chore.next = Chore.nextDue(chore);
  chore.isOverdue = chore.next === OVERDUE;
  return chore;
};


module.exports = Chore;
