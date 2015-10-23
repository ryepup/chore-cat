var moment = require('moment');

module.exports = function() {
  return date => moment(date).fromNow();
};
