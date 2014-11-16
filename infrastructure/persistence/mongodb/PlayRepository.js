exports.New = function(db) {
    var repository = require('./BaseRepository').New(db, 'play');
    return repository;
}