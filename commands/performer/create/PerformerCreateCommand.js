/*
 TESTS
 - When the name is duplicated return an error
 */
var Performer = require('../../../entities/Performer'),
    commandPrototype = {
        exec: function(request, cb) {
            var performer = Performer.New(request.name);
            this.repository.persist(performer, cb);
        }
    };

exports.New = function(repository) {
    var command = Object.create(commandPrototype);
    command.repository = repository;
    return command;
};