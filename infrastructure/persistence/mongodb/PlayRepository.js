exports.New = function(db) {
    var repository = require('./BaseRepository').New(db, 'play');
    repository.parseEntity = function(data) {
        return new require('../../../entities/Play')(data.title, data.performer, data.start, data.end, data.channel);
    }
    return repository;
}