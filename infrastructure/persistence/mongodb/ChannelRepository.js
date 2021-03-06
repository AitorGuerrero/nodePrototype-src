var baseRepo = require('./BaseRepository');

module.exports = ChannelRepository;

function ChannelRepository (db) {
    this.collection = db.collection('channel');
}
ChannelRepository.prototype.find = baseRepo.prototype.find;
ChannelRepository.prototype.persist = baseRepo.prototype.persist;
ChannelRepository.prototype.parseEntity = function(data) {
    return new (require('../../../entities/Channel'))(data.name);
};