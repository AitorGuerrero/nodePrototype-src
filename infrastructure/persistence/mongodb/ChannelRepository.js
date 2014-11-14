var repository = {
    persist: function(channel, cb) {
        this.collection.insert(channel, function(err) {
            cb(err);
        });
    }
};

exports.New = function(db) {
    var repository = Object.create(repository);
    repository.collection = db.collection('channel');
    return repository;
}