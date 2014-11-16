/*
 TESTS
 - When the name is duplicated return an error
 - When the performer does not exist return an error
 */
var Play = require('../../../entities/Play'),
    commandPrototype = {
        exec: function(request, cb) {
            var play = Play.New(
                request.title,
                request.performer,
                request.start,
                request.end,
                request.channel
            );
            this.playRepository.persist(play, cb);
        }

    };

exports.New = function(playRepository) {
    var command = Object.create(commandPrototype, {
        playRepository: {value: playRepository}
    });
    return command;
};