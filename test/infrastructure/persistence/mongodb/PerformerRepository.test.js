var should = require('should'),
    basePath = '../../../../',
    PerformerRepo = require(basePath + 'infrastructure/persistence/mongodb/PerformerRepository'),
    Performer = require(basePath + 'entities/Performer');

var config = {
    url: '127.0.0.1',
    port: '27017',
    dbName: 'nodePrototype_test'
};

describe('Performer repository', function() {
    beforeEach(function(done) {
        require('mongodb')
            .MongoClient
            .connect('mongodb://' + config.url + ':' + config.port + '/' + config.dbName, function(err, db) {
                if(err) {
                    throw err;
                }
                this.db = db;
                this.repo = new PerformerRepo(this.db);
                this.collection = this.db.collection('performer');
                this.collection.remove({}, done);
            }.bind(this));
    });
    describe('Searching for a Performer', function() {
        beforeEach(function(done) {
            var data = [
                {name: 'PerfA'},
                {name: 'PerfB'},
                {name: 'PerfC'}
            ];
            this.collection.insert(data, done);
        });
        describe('PerfB', function() {
            beforeEach(function(done) {
                this.repo.find(
                    'PerfB',
                    function(err, result) {
                        this.result = result;
                        done(err);
                    }.bind(this)
                );
            });
            it('Should return a element', function() {
                (typeof(this.result)).should.be.eql('object');
            });
            it('Should return a element Performer instance', function() {
                (this.result instanceof Performer).should.be.ok;
            });
            it('Should return Performer PerfB', function() {
                this.result.name.should.be.eql('PerfB');
            });
        });
        describe('When the perfromer does not exixts', function() {
            beforeEach(function(done) {
                this.repo.find(
                    'PerfZ',
                    function(err, result) {
                        this.err = err;
                        this.result = result;
                        done();
                    }.bind(this)
                );
            });
            it('Should return a error', function() {
                (typeof(this.err)).should.be.ok;
            });
        });
    });
    describe('persisting Performer PerfA', function() {
        beforeEach(function(done) {
            this.repo.persist(new Performer('PerfA'), done);
        });
        it('should be in the database', function(done) {
            this.collection.findOne({name: 'PerfA'}, function(err, result) {
                result.name.should.be.eql('PerfA');
                done(err);
            }.bind(this));
        })
    });
});