exports = module.exports = BaseRepository;

function BaseRepository (db, collectionName) {
}

BaseRepository.prototype = {
    persist: function (channel, cb) {
        this.collection.insert(channel, function (err) {
            cb(err);
        });
    },
    find: function(id, cb) {
        this.collection.findOne({name: id}, function(err, data) {
            if(err) {
                cb(err);
            } else if (data === null) {
                cb('document not existent');
            } else {
                cb(null, this.parseEntity(data));
            }
        }.bind(this));
    }
};