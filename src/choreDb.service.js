var angular = require('angular'),
    _ = require('lodash'),
    moment = require('moment'),
    defaultDb = {
      chores: [],
      settings: {},
      version: 1
    },
    key = 'CHORES'
;

module.exports = function($window, $timeout, $q) {
  var self = this,
      localStorage = $window.localStorage,
      db = load(),
      nextId = Math.max(_(db.chores).pluck('id').max(), 1);
  ;

  self.all = all;
  self.addChore = addChore;
  self.addActivity = addActivity;
  self.byId = byId;
  self.settings = db.settings;
  self.persist = persist;

  function all() {
    return $q.when(db.chores);
  }

  function addChore(chore) {
    db.chores.unshift(_.extend({id: nextId++, activities:[]}, chore));
    return persist().then(function() {
      return db.chores[0];
    });
  }

  function addActivity(id, activity) {
    var act = {
      who: self.settings.username,
      when: moment(activity.when).toISOString()
    };
    return byId(id)
      .then(function(chore) {
        chore.activities.push(act);
        return persist().then(function() {
          return chore;
        });
      });
  }

  function byId(id) {
    return $q.when(_.findWhere(db.chores, {id: parseInt(id)}));
  }

  function persist() {
    return $timeout(function() {
      localStorage.setItem(key, angular.toJson(db));
      return true;
    });
  }

  function load() {
    return angular.fromJson(localStorage.getItem(key))
      || defaultDb;
  }

};
