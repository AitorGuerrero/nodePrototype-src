var baseRepo = require('./BaseRepository');

module.exports = PerformerRepository;

function PerformerRepository (db) {
    this.collection = db.collection('performer');
}
PerformerRepository.prototype.find = baseRepo.prototype.find;
PerformerRepository.prototype.persist = baseRepo.prototype.persist;
PerformerRepository.prototype.parseEntity = function(data) {
    return new (require('../../../entities/Performer'))(data.name);
};