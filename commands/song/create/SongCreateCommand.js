var Song = require('../../../entities/Song'),
    Performer = require('../../../entities/Performer'),
    commandPrototype = {
        exec: function(request, cb) {
            var repository = this.performerRepository;
            repository.find(request.performer, function(err, performer) {
                if(err) {
                    performer = new Performer(request.performer);
                }
                performer.addSong(new Song(request.name));
                repository.persist(performer, cb);
            });
        }
    };

exports.New = function(performerRepository) {
    var command = Object.create(commandPrototype, {
        performerRepository: {value: performerRepository}
    });
    return command;
};