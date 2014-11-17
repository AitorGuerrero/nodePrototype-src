/*
TESTS
- duplicated name
 */
var should = require('should'),
    command = require('../../../../commands/song/create/SongCreateCommand'),
    Performer = require('../../../../entities/Performer'),
    RepoMock = {
        find: function(name, cb) {
            this.findCalls.push(arguments);
            var performer = new Performer('performerTest');
            performer.addSong({}).addSong({});
            cb(null, performer);
        },
        persist: function(channel, cb) {
            this.persistCalls.push(arguments);
            cb();
        }
    };

describe('SongCreate Command', function(){
    describe('Initialized', function() {
        beforeEach(function() {
            this.repo = Object.create(RepoMock);
            this.repo.persistCalls = [];
            this.repo.findCalls = [];
            this.command = new command(this.repo);
        });
        describe('Executing the command', function() {
            it('Should save the performer with the song in the repository', function(done) {
                this.command.exec({
                    name: 'pruebaNombre',
                    performer: 'performerTest'
                }, function(err) {
                    if(err) {
                        throw err;
                    }

                    this.repo.findCalls.length.should.be.eql(1);
                    var findedName = this.repo.findCalls[0][0];
                    findedName.should.be.eql('performerTest');

                    this.repo.persistCalls.length.should.be.eql(1);
                    var savedPerformer = this.repo.persistCalls[0][0];
                    savedPerformer.name.should.be.eql('performerTest');
                    savedPerformer.songs.length.should.be.eql(3);
                    var savedSong = savedPerformer.songs[2];
                    savedSong.name.should.be.eql('pruebaNombre');

                    done();
                }.bind(this));
            });
            describe('If the performer does not exists', function() {
                beforeEach(function() {
                    this.repo.find = function(name, cb) {
                        cb('Does not exist');
                    }
                });
                it('Should create a new Performer', function(done) {
                    this.command.exec({
                        name: 'pruebaNombre',
                        performer: 'performerTest'
                    }, function() {
                        this.repo.persistCalls.length.should.be.eql(1);
                        var savedPerformer = this.repo.persistCalls[0][0];
                        savedPerformer.name.should.be.eql('performerTest');
                        savedPerformer.songs.length.should.be.eql(1);
                        var savedSong = savedPerformer.songs[0];
                        savedSong.name.should.be.eql('pruebaNombre');

                        done();
                    }.bind(this));
                });
            });
        });
    });
})