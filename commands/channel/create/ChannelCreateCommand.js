var Channel = require('../../../entities/Channel'),
    commandPrototype = {
        exec: function(request, cb) {
            var channel = Channel.New(request.name);
            //channel.name = request.name;
            this.repository.persist(channel, function(err) {
                if(err) {
                    cb(err);
                } else {
                    cb(null);
                }
            });
        }
    };

exports.New = function(repository) {
    var channel = Object.create(commandPrototype);
    channel.repository = repository;
    return channel;
};