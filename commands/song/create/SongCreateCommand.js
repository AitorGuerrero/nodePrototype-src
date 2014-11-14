/*
 TESTS
 - When the name is duplicated return an error
 - When the performer does not exist return an error
 */
var Song = require('../../../entities/Song'),
    Performer = require('../../../entities/Performer'),
    commandPrototype = {
        exec: function(request, cb) {
            var repository = this.performerRepository;
            repository.find(request.performer, function(err, performer) {
                if(err) {
                    performer = Performer.New(request.performer);
                }
                performer.addSong(Song.New(request.name));
                repository.persist(performer, cb);
            });
        }
    };

exports.New = function(performerRepository) {
    var command = Object.create(commandPrototype);
    command.performerRepository = performerRepository;
    return command;
};