var should = require('should'),
    basePath = '../../../../',
    ChannelRepo = require(basePath + 'infrastructure/persistence/mongodb/ChannelRepository'),
    Channel = require(basePath + 'entities/Channel');

var config = {
    url: '127.0.0.1',
    port: '27017',
    dbName: 'nodePrototype_test'
};

describe('Channel repository', function() {
    beforeEach(function(done) {
        require('mongodb')
            .MongoClient
            .connect('mongodb://' + config.url + ':' + config.port + '/' + config.dbName, function(err, db) {
                if(err) {
                    throw err;
                }
                this.db = db;
                this.repo = new ChannelRepo(this.db);
                this.collection = this.db.collection('channel');
                this.collection.remove({}, done);
            }.bind(this));
    });
    describe('Searching for a channel', function() {
        beforeEach(function(done) {
            var data = [
                {name: 'ChanA'},
                {name: 'ChanB'},
                {name: 'ChanC'}
            ];
            this.collection.insert(data, done);
        });
        describe('ChanB', function() {
            beforeEach(function(done) {
                this.repo.find(
                    'ChanB',
                    function(err, result) {
                        this.result = result;
                        done(err);
                    }.bind(this)
                );
            });
            it('Should return a element', function() {
                (typeof(this.result)).should.be.eql('object');
            });
            it('Should return a element Channel instance', function() {
                (this.result instanceof Channel).should.be.ok;
            });
            it('Should return channel ChanB', function() {
                this.result.name.should.be.eql('ChanB');
            });
        });
    });
    describe('persisting channel ChanA', function() {
        beforeEach(function(done) {
            this.repo.persist(new Channel('ChanA'), done);
        });
        it('should be in the database', function(done) {
            this.collection.findOne({name: 'ChanA'}, function(err, result) {
                result.name.should.be.eql('ChanA');
                done(err);
            }.bind(this));
        })
    });
});