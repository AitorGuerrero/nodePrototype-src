var should = require('should'),
    command = require('../../../../commands/performer/create/PerformerCreateCommand.js'),
    RepoMock = {
        persistCalls: [],
        persist: function(channel, cb) {
            this.persistCalls.push(arguments);
            cb();
        }
    };

describe('Performer Create Command', function(){
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
                    var savedPerformer = this.repo.persistCalls[0][0];
                    savedPerformer.name.should.be.eql('pruebaNombre');
                    done();
                }.bind(this));
            });
        });
    });
})