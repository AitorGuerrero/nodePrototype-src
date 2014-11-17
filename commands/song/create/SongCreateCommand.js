exports = module.exports = Command;

var Performer = require('../../../entities/Performer'),
    Song = require('../../../entities/Song');

function Command (performerRepository) {
    this.performerRepository = performerRepository;
};

Command.prototype = {
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