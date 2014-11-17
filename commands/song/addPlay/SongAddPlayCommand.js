exports = module.exports = Command;

function Command (playRepository) {
    this.playRepository = playRepository;
};

Command.prototype = {
    exec: function(request, cb) {
        var Play = require('../../../entities/Play');
        var play = new Play(
            request.title,
            request.performer,
            request.start,
            request.end,
            request.channel
        );
        this.playRepository.persist(play, cb);
    }
};