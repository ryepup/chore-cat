module.exports = function($delegate, logs, config) {
  var logFns = 'debug warn info error log'.split(' ');

  logFns.map(function(name) {
    var original = $delegate[name];
    $delegate[name] = function() {
      var args = [].slice.call(arguments);
      original.apply(null, args);

      if(config.logging) logs.push({
        when: new Date(),
        level: name,
        message: args
      });
    };
  });

  return $delegate;
};
