var repository = {
    persist: function(channel, cb) {
        this.db.insert(channel, function(err) {
            cb(err);
        });
    }
};

exports.New = function(db) {
    var repository = Object.create(repository);
    repository.db = db;
    return repository;
}