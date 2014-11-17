exports.New = function(db) {
    var repository = require('./BaseRepository').New(db, 'channel');
    repository.parseEntity = function(data) {
        return new require('../../../entities/Channel')(data.name);
    };
    return repository;
}