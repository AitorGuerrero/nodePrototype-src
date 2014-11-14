/*
 TESTS
 - When the name is duplicated return an error
 */
var Performer = require('../../../entities/Performer'),
    commandPrototype = {
        exec: function(request, cb) {
            this.repository.find(request.name, function(err) {
                if(err) {
                    var performer = Performer.New(request.name);
                    this.repository.persist(performer, cb);
                } else {
                    cb();
                }
            }.bind(this));
        }
    };

exports.New = function(repository) {
    var command = Object.create(commandPrototype);
    command.repository = repository;
    return command;
};