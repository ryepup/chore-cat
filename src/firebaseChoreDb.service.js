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

module.exports = function($q, $log, $timeout) {
  var self = this;
  self.connect = connect;
  self.connection = {isConnected: false};

  self.all = all;
  self.addChore = addChore;
  self.addActivity = addActivity;
  self.byId = byId;
  self.removeActivity = removeActivity;
  self.saveChore = saveChore;

  var db;

  function saveChore(chore) {
    var path = chorePath(chore.id);
    return update(path, _.pick(chore, 'frequency'));
  }

  function removeActivity(id, activity) {
    return set(activityPath(id, activity.id), null);
  }

  function all() {
    return get('chore-cat/chores').then(_.values, logError);
  }

  function addChore(chore) {
    var id = uuid.v4();
    chore.id = id;
    return set(chorePath(id), chore)
      .then(byId.bind(null, id), logError);
  }

  function byId(id) {

    return get(chorePath(id))
      .then(function(chore) {
        chore.activities = _.values(chore.activities) || [];
        return chore;
      }, logError);
  }

  function addActivity(choreId, activity) {
    var id = uuid.v4();
    activity.id = id;
    return set(activityPath(choreId, id), activity)
      .then(byId.bind(null, choreId), logError);
  }

  function connect(config) {
    var url = firebaseUrl(config.url);
    if(db){
      if(db.toString() == url){
        $log.debug('already connected to', url);
        return;
      }
      db.off();
//      db.goOffline();
    }
    $log.debug('connecting to', url);

    db = new Firebase(url);
    watch('.info/connected')
      .then(null, null, function(isConnected) {
        $log.debug('connection status changed:', isConnected);
        self.connection.isConnected = isConnected === true;
      });

    if(config.token){
      db.authWithCustomToken(config.token, function(error, authData) {
        if (error) {
          $log.error("Auth failed!", error);
        } else {
          $log.debug("Auth succeeded!", authData);
        }
      });
    }
  }

  function logError(err) {
    $log.error(err);
    alert(err);
  }

  function get(path) {
    $log.debug('get', path);
    var q = db.child(path);
    return $q(function(resolve, reject) {
      q.once('value', function(res) {
        $log.debug('got', res);
        resolve(res.val());
      }, function(err) {
        logError(err); reject(err);
      });
    });
  }

  function watch(path) {
    $log.debug('watch', path);
    var d = $q.defer();
    db.child(path).on('value', function(snapshot) {
      $log.debug('watched', snapshot);
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

  function update(path, value) {
    $log.debug('update', path, value);
    return $q(function(resolve, reject) {
      db.child(path).update(value, function(err) {
        if(err) reject(err);
        resolve();
      });
    });
  }
};
