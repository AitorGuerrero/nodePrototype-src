var should = require('should'),
    Repo = require('../../../../infrastructure/persistence/mongodb/PlayRepository');

var config = {
    url: '127.0.0.1',
    port: '27017',
    dbName: 'nodePrototype_test'
};

describe('Play repository', function() {
    beforeEach(function(done) {
        require('mongodb')
            .MongoClient
            .connect('mongodb://' + config.url + ':' + config.port + '/' + config.dbName, function(err, db) {
                if(err) {
                    throw err;
                }
                this.db = db;
                this.repo = new Repo(this.db);
                this.collection = this.db.collection('plays');
                this.collection.remove({}, done);
            }.bind(this));
    });
    describe('Searching for the top', function() {
        describe('Having all in the date, same channel, same performer ', function() {
            beforeEach(function(done) {
                var data = generator('TitA', 'PerfA', 'ChanA', 0, 5)
                    .concat(generator('TitB', 'PerfA', 'ChanA', 0, 10))
                    .concat(generator('TitC', 'PerfA', 'ChanA', 0, 15));
                this.collection.insert(data, done);
            });
            describe('Searching one day, limit 2 one channel', function() {
                beforeEach(function(done) {
                    this.repo.findTopSongs(
                        ['ChanA'],
                        new Date('2014-05-14'),
                        new Date('2014-05-15'),
                        2,
                        function(err, result) {
                            this.result = result;
                            done(err);
                        }.bind(this)
                    );
                });
                it('Should limit correctly', function() {
                    this.result.length.should.be.eql(2);
                });
                it('Should order correctly', function() {
                    this.result[0].title.should.be.eql('TitC');
                    this.result[1].title.should.be.eql('TitB');
                });
                it('Should return correct fields', function() {
                    this.result[0].title.should.ok;
                    this.result[0].performer.should.ok;
                    this.result[0].playsAmount.should.ok;
                });
            });
        });

        describe('Having in various dates', function() {
            beforeEach(function(done) {
                var data = generator('TitA', 'PerfA', 'ChanA', 0, 5)
                    .concat(generator('TitB', 'PerfA', 'ChanA', 0, 10))
                    .concat(generator('TitC', 'PerfA', 'ChanA', 0, 15))
                    .concat(generator('TitD', 'PerfA', 'ChanA', 1, 20))
                    .concat(generator('TitE', 'PerfA', 'ChanA', -1, 20));
                this.collection.insert(data, done);
            });
            describe('Searching one day, limit 2 one channel', function() {
                beforeEach(function(done) {
                    this.repo.findTopSongs(
                        ['ChanA'],
                        new Date('2014-05-14'),
                        new Date('2014-05-15'),
                        2,
                        function(err, result) {
                            this.result = result;
                            done(err);
                        }.bind(this)
                    );
                });
                it('Should order correctly', function() {
                    this.result[0].title.should.be.eql('TitC');
                    this.result[1].title.should.be.eql('TitB');
                });
            });
        });

        describe('Having in various channels', function() {
            beforeEach(function(done) {
                var data = generator('TitA', 'PerfA', 'ChanA', 0, 5)
                    .concat(generator('TitB', 'PerfA', 'ChanA', 0, 10))
                    .concat(generator('TitC', 'PerfA', 'ChanA', 0, 15))
                    .concat(generator('TitD', 'PerfA', 'ChanB', 0, 20))
                this.collection.insert(data, done);
            });
            describe('Searching one day, limit 2 one channel', function() {
                beforeEach(function(done) {
                    this.repo.findTopSongs(
                        ['ChanA'],
                        new Date('2014-05-14'),
                        new Date('2014-05-15'),
                        2,
                        function(err, result) {
                            this.result = result;
                            done(err);
                        }.bind(this)
                    );
                });
                it('Should order correctly', function() {
                    this.result[0].title.should.be.eql('TitC');
                    this.result[1].title.should.be.eql('TitB');
                });
            });
        });

        describe('Same title, diffrent performer', function() {
            beforeEach(function(done) {
                var data = generator('TitA', 'PerfA', 'ChanA', 0, 5)
                    .concat(generator('TitB', 'PerfA', 'ChanA', 0, 10))
                    .concat(generator('TitA', 'PerfB', 'ChanA', 0, 15));
                this.collection.insert(data, done);
            });
            describe('Searching one day, limit 2 one channel', function() {
                beforeEach(function(done) {
                    this.repo.findTopSongs(
                        ['ChanA'],
                        new Date('2014-05-14'),
                        new Date('2014-05-15'),
                        2,
                        function(err, result) {
                            this.result = result;
                            done(err);
                        }.bind(this)
                    );
                });
                it('Should order correctly', function() {
                    this.result[0].title.should.be.eql('TitA');
                    this.result[0].performer.should.be.eql('PerfB');
                    this.result[1].title.should.be.eql('TitB');
                });
            });
        });
    });
});

function generator (title, performer, channel, dayOffset, amount) {
    var plays = [], i, start, end,
        twelveHours = 1000 * 60 * 60 * 12,
        oneDay = 1000 * 60 * 60 * 24,
        fiveMinutes = 1000 * 60 * 5,
        startTime = new Date('2014-05-14').getTime() + twelveHours + oneDay * dayOffset;
    start = new Date(startTime);
    end = new Date(startTime + fiveMinutes);
    for (i = 0; i < amount; i++) {
        plays.push({
            title: title,
            performer: performer,
            channel: channel,
            start: start,
            end: end
        });
    }
    return plays;
}