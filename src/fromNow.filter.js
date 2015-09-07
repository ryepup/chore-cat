var moment = require('moment');

function fromNow(date) {
  return moment(date).fromNow();
};


module.exports = function() {
  return fromNow;
};
