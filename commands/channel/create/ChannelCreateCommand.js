/*
 TESTS
 - When the name is duplicated return an error
 */
var Channel = require('../../../entities/Channel'),
    commandPrototype = {
        exec: function(request, cb) {
            var channel = Channel.New(request.name);
            this.repository.persist(channel, cb);
        }
    };

exports.New = function(repository) {
    var command = Object.create(commandPrototype, {
        repository: {value: repository}
    });
    return command;
};