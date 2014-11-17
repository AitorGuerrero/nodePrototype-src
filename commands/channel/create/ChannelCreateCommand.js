exports = module.exports = Command;

var Channel = require('../../../entities/Channel');

function Command (repository) {
    this.repository = repository;
};

Command.prototype = {
    exec: function(request, cb) {
        var channel = new Channel(request.name);
        this.repository.persist(channel, cb);
    }
};