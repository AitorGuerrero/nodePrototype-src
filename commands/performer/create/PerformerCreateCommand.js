var Performer = require('../../../entities/Performer'),
    commandPrototype = {
        exec: function(request, cb) {
            var performer = Performer.New(request.name);
            this.repository.persist(performer, function(err) {
                if(err) {
                    cb(err);
                } else {
                    cb(null);
                }
            });
        }
    };

exports.New = function(repository) {
    var command = Object.create(commandPrototype);
    command.repository = repository;
    return command;
};