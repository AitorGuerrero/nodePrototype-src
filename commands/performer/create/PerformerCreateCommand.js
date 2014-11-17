exports = module.exports = Command;

function Command (repository) {
    this.repository = repository;
};

Command.prototype = {
    exec: function(request, cb) {
        this.repository.find(request.name, function(err) {
            var Performer = require('../../../entities/Performer');
            if(err) {
                this.repository.persist(new Performer(request.name), function(err) {
                    cb(err);
                });
            } else {
                cb();
            }
        }.bind(this));
    }
};