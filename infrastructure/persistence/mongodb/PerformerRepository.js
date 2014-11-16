exports.New = function(db) {
    var repository = require('./BaseRepository').New(db, 'performer');
    return repository;
}