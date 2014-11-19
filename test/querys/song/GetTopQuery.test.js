var should = require('should'),
    Query = require('../../../querys/song/getTopQuery');

describe('Get top songs request', function() {
    beforeEach(function() {
        this.repo = {
            findTopSongs: function(channels, start, end, limit, cb) {
                this.findCalls.push(arguments);
                cb.apply(null, this.findCallback.apply(this, arguments));
            },
            findCalls: []
        };
        this.query = new Query(this.repo);
    });
    describe('Asking for plays', function() {
        beforeEach(function() {
            this.repo.findCallback = function(channels, start) {
                if(start.getTime() == (new Date('2014-10-21T00:00:00')).getTime()) {
                    var result = [null, [
                        {title: 'titA', performer: 'perfA', channel: 'ChanA', playsAmount: 10},
                        {title: 'titB', performer: 'perfB', channel: 'ChanB', playsAmount: 3}
                    ]];
                } else if (start.getTime() == (new Date('2014-10-14T00:00:00')).getTime()) {
                    var result = [null, [
                        {title: 'titB', performer: 'perfB', channel: 'ChanB', playsAmount: 4},
                        {title: 'titA', performer: 'perfA', channel: 'ChanA', playsAmount: 3}
                    ]];
                } else {
                    throw 'Bad call to find';
                }
                return result;
            };
        });
        describe('Doing request', function() {
            beforeEach(function(done) {
                var request = {
                    channels: ['chanA', 'chanB'],
                    start: new Date('2014-10-21T00:00:00'),
                    end: new Date('2014-10-28T00:00:00'),
                    limit: 2
                };
                this.query.execute(request, function(err, data) {
                    this.result = data;
                    done(err);
                }.bind(this));
            });
            it('should return correct amount', function() {
                this.result.length.should.be.eql(2);
            });
            it('should return correct plays list', function() {
                var firstResult = this.result[0];
                firstResult.channel.should.be.eql('ChanA');
                firstResult.rank.should.be.eql(1);
                firstResult.playsAmount.should.be.eql(10);
                firstResult.previousRank.should.be.eql(2);
                firstResult.previousPlaysAmount.should.be.eql(3);
            });
        });
    });
});