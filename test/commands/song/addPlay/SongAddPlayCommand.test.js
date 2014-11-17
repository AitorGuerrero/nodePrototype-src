var should = require('should'),
    command = require('../../../../commands/song/addPlay/SongAddPlayCommand.js'),
    Performer = require('../../../../entities/Performer'),
    repo = {
        prototypeMock: {
            find: function(name, cb) {
                this.findCalls.push(arguments);
                cb.apply(null, this.findCallback);
            },
            persist: function(document, cb) {
                this.persistCalls.push(arguments);
                cb.apply(null, this.persistCallback);
            }
        },
        New: function() {
            return Object.create(repo.prototypeMock, {
                findCalls: {value: []},
                persistCalls: {value: []},
                findCallback: {value: [null, new Performer('Pis')], writable: true},
                persistCallback: {value: [], writable: true}
            });
        }
    }

describe('Song add play create command', function(){
    describe('Initialized', function() {
        beforeEach(function() {
            this.repo = repo.New();
            this.command = command.New(this.repo);
            this.dateFrom = new Date();
            this.dateTo = new Date();
        });
        describe('Executing', function() {
            it('Should save the play', function(done) {
                var query = {
                    title: 'song',
                    performer: 'performer',
                    start: new Date(this.dateFrom),
                    end: new Date(this.dateTo),
                    channel: 'channel'
                };
                this.command.exec(query, function(err) {
                    this.repo.persistCalls.length.should.be.eql(1);
                    var saved = this.repo.persistCalls[0][0];
                    saved.title.should.be.eql('song');
                    saved.performer.should.be.eql('performer');
                    saved.start.should.be.eql(this.dateFrom);
                    saved.end.should.be.eql(this.dateTo);
                    saved.channel.should.be.eql('channel');
                    done(err);
                }.bind(this));
            });
        });
    });
});