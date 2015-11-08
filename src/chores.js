var moment = require('moment'),
    _ = require('lodash'),
    chores = [],
    Chore = require('./Chore.js')
;

// @ngInject
module.exports = function($q, $log, choreDb, firebaseChoreDb, settings) {
  var self = this;
  self.fetch = fetch;
  self.addActivity = addActivity;
  self.removeActivity = removeActivity;
  self.hasActivity = hasActivity;
  self.add = add;
  self.save = save;

  function db() {
    return settings.load().useFirebase ? firebaseChoreDb : choreDb;
  }

  function fetch(id) {
    if(id) {
      return db().byId(id)
        .then(Chore.create);
    }
    return db().all()
      .then(chores => chores.map(Chore.create));
  }

  function addActivity(chore, who, when) {
    return db()
      .addActivity(chore.id, {
        who: who,
        when: moment(when).toISOString()
      })
      .then(Chore.create);
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
    return _.some(chore.activities,
                  item => d.isSame(item.when, 'day'));
  }

  function add(chore) {
    return db().addChore(chore)
      .then(Chore.create);
  }

  function save(chore) {
    return db().saveChore(chore);
  }
};
