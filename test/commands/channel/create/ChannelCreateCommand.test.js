var should = require('should'),
    command = require('../../../../commands/channel/create/ChannelCreateCommand.js'),
    RepoMock = {
        persistCalls: [],
        persist: function(channel, cb) {
            this.persistCalls.push(arguments);
            cb();
        }
    };

describe('ChannelCreateCommand', function(){
    describe('Initialized', function() {
        beforeEach(function() {
            this.repo = Object.create(RepoMock);
            this.command = command.New(this.repo);
        });
        describe('Executing the command', function() {
            it('Should save the channel in the repository', function(done) {
                this.command.exec({name: 'pruebaNombre'}, function(err) {
                    if(err) {
                        throw err;
                    }
                    this.repo.persistCalls.length.should.be.eql(1);
                    var savedChannel = this.repo.persistCalls[0][0];
                    savedChannel.name.should.be.eql('pruebaNombre');
                    done();
                }.bind(this));
            });
        });
    });
})