exports.BaseRepository = function(db, collectionName) {
    var repository = Object.create({
        persist: function (channel, cb) {
            this.collection.insert(channel, function (err) {
                cb(err);
            });
        },
        find: function(id, cb) {
            this.collection.findOne({name: id}, cb);
        }
    }, {
        collection: {value: db.collection(collectionName)}
    });
    return repository;
}