var angular = require('angular'),
    _ = require('lodash'),
    moment = require('moment'),
    defaultDb = {
      chores: [],
      version: 1
    },
    key = 'CHORES'
;

// @ngInject
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
  self.removeActivity = removeActivity;
  self.saveChore = saveChore;

  function saveChore(chore) {
    return persist().then(() => chore);
  }

  function removeActivity(id, activity) {
    return byId(id)
      .then(function(chore) {
        chore.activities = _.reject(chore.activities, {id: activity.id});
        return saveChore(chore);
      });
  }

  function all() {
    return $q.when(db.chores);
  }

  function addChore(chore) {
    db.chores.unshift(_.extend({id: nextId++, activities:[]}, chore));
    return saveChore(db.chores[0]);
  }

  function addActivity(id, activity) {
    return byId(id)
      .then(function(chore) {
        activity = nextId++;
        chore.activities.push(activity);
        return saveChore(chore);
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
