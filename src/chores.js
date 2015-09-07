var moment = require('moment'),
    chores = [
      {name: 'vacuum', frequency: 14, last: new Date(), who: 'Ryan'},
      {name: 'litterbox', frequency: 4 },
      {name: 'dishes', frequency: 4, last: new Date(), who: 'Ryan'}
    ]
;

function nextDue(chore) {
  return moment(chore.last).add(chore.frequency, 'days');
}

function initialize(chore) {
  chore.next = nextDue(chore);
  return chore;
}

module.exports = function($q) {
  var self = this;
  self.fetch = fetch;

  function fetch() { return $q.when(chores.map(initialize)); }
};
