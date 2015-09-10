var Firebase = require('firebase'),
    uuid = require('uuid'),
    _ = require('lodash');

function firebaseUrl(appName) {
  return 'https://' + appName + '.firebaseio.com/';
}

function chorePath(id) { return '/chore-cat/chores/' + (id || ''); }
function activityPath(choreId, id) {
  return chorePath(choreId) + '/activities/' + id;
}

module.exports = function($q, $log) {
  var self = this;
  self.connect = connect;
  self.connection = {isConnected: false};

  self.all = all;
  self.addChore = addChore;
  self.addActivity = addActivity;
  self.byId = byId;
  self.removeActivity = removeActivity;

  var db;

  function removeActivity(id, activity) {
    return set(activityPath(id, activity.id), null);
  }

  function all() {
    return get('chore-cat/chores').then(_.values);
  }

  function addChore(chore) {
    var id = uuid.v4();
    chore.id = id;
    return set(chorePath(id), chore)
      .then(byId.bind(null, id));
  }

  function byId(id) {

    return get(chorePath(id))
      .then(function(chore) {
        chore.activities = _.values(chore.activities) || [];
        return chore;
      });
  }

  function addActivity(choreId, activity) {
    var id = uuid.v4();
    activity.id = id;
    return set(activityPath(choreId, id), activity)
      .then(byId.bind(null, choreId));
  }

  function connect(appName) {
    var url = firebaseUrl(appName);
    if(db){
      if(db.toString() == url){
        $log.debug('already connected to', url);
        return;
      }
      db.off();
      db.goOffline();
    }
    $log.debug('connecting to', url);

    db = new Firebase(url);
    watch('.info/connected')
      .then(null, null, function(isConnected) {
        $log.debug('connection status changed:', isConnected);
        self.connection.isConnected = isConnected === true;
      });
  }

  function get(path) {
    $log.debug('get', path);
    var q = db.child(path);
    return $q(function(resolve, reject) {
      q.once('value', function(res) { resolve(res.val()); });
    });
  }

  function watch(path) {
    var d = $q.defer();
    db.child(path).on('value', function(snapshot) {
      d.notify(snapshot.val());
    });
    return d.promise;
  }

  function set(path, value) {
    $log.debug('set', path, value);
    return $q(function(resolve, reject) {
      db.child(path).set(value, function(err) {
        if(err) reject(err);
        resolve();
      });
    });
  }
};
