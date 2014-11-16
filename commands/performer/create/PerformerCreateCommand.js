/*
 TESTS
 - When the name is duplicated return an error
 */
var Performer = require('../../../entities/Performer'),
    commandPrototype = {
        exec: function(request, cb) {
            this.repository.find(request.name, function(err) {
                if(err) {
                    this.repository.persist(Performer.New(request.name), function(err) {
                        cb(err);
                    });
                } else {
                    cb();
                }
            }.bind(this));
        }
    };

exports.New = function(repository) {
    var command = Object.create(commandPrototype, {
        repository: {value: repository}
    });
    return command;
};