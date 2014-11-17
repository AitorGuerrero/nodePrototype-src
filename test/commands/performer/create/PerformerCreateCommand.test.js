var should = require('should'),
    command = require('../../../../commands/performer/create/PerformerCreateCommand.js'),
    RepoMock = {
        find: function(name, cb) {
            this.findCalls.push(arguments);
            cb.apply(null, this.findCallback);
        },
        persist: function(channel, cb) {
            this.persistCalls.push(arguments);
            cb.apply(null, this.persistCallback);
        }
    };

describe('Performer Create Command', function(){
    describe('Initialized', function() {
        beforeEach(function() {
            this.repo = Object.create(RepoMock, {
                findCalls: {value: []},
                persistCalls: {value: []},
                findCallback: {value: [], writable: true},
                persistCallback: {value: [], writable: true}
            });
            this.command = new command(this.repo);
        });
        describe('If the performer dos not exists', function() {
            beforeEach(function() {
                this.repo.findCallback = ['Errorrr'];
            });
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
        describe('If the performer exists', function() {
            beforeEach(function(){
                this.repo.findCallback = [null, {}];
            });
            it('Should not do nothing', function(done) {
                this.command.exec({name: 'pruebaNombre'}, function(err) {
                    this.repo.persistCalls.length.should.be.eql(0);
                    done(err);
                }.bind(this));
            });
        });
    });
});