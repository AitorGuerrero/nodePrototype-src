exports.New = function(db) {
    var repository = require('./BaseRepository').New(db, 'channel');
    return repository;
}