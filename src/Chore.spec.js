var Chore = require('./Chore.js'),
    moment = require('moment')
;

describe('Chore', function() {
  var chore = {
    last: {when : '2015-01-01'},
    frequency: 5
  };

  describe('nextDue', function() {
    it('considers no last activity to be OVERDUE', function() {
      expect(Chore.nextDue({})).toBe(Chore.OVERDUE);
    });

    it('considers late activity OVERDUE', function() {
      expect(Chore.nextDue(chore, '2015-01-07'))
        .toBe(Chore.OVERDUE);
    });

    it('returns a moment for the next due date', function() {
      var next = Chore.nextDue(chore, '2015-01-03');
      expect(moment.isMoment(next))
        .toBe(true);
      expect(next.format('YYYY-MM-DD'))
        .toBe('2015-01-06');
    });

  });
});
