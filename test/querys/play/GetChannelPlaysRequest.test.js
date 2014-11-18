var should = require('should'),
    Command = require('../../../querys/play/GetChannelPlaysQuery'),
    Play = require('../../../entities/Play');

describe('Get channel plays request', function() {
    beforeEach(function() {
        this.repo = {
            findChannelPlays: function(start, end, cb) {
                this.findCalls.push(arguments);
                cb.apply(null, this.findCallback());
            },
            findCalls: []
        };
        this.command = new Command(this.repo);
    });
    describe('Asking for plays', function() {
        beforeEach(function() {
            this.repo.findCallback = function() {
                var result = [null, [
                    new Play('title', 'performer', 'start', 'end', 'channel'),
                    new Play('titleA', 'performerA', '2014-01-10T01:00:00', '2014-01-10T01:03:00', 'ChannelA'),
                    new Play('title', 'performer', 'start', 'end', 'channel'),
                ]];
                return result;
            };
        });
        it('should return correct plays list', function(done) {
            var request = {
                start: '2014-10-21T00:00:00',
                end: '2014-10-28T00:00:00'
            };
            this.command.exec(request, function(err, data) {
                data.length.should.be.eql(3);
                data[1].title.should.be.eql('titleA');
                data[1].performer.should.be.eql('performerA');
                data[1].start.should.be.eql('2014-01-10T01:00:00');
                data[1].end.should.be.eql('2014-01-10T01:03:00');
                done();
            });
        });
    });
});