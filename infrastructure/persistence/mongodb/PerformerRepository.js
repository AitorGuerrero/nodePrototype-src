exports = module.exports = PerformerRepository;

function PerformerRepository(db) {
    var repository = new require('./BaseRepository')(db, 'performer');
    repository.parseEntity = function(data) {
        return new require('../../../entities/Performer')(data.name);
    }
    return repository;
}