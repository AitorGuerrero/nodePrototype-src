module.exports = Repository;
var Play = require('../../../entities/Play'),
    baseRepo = require('./BaseRepository');

function Repository (db) {
    this.collection = db.collection('plays');
    this.parseEntity = function(data) {
        return new Play(data.title, data.performer, data.start, data.end, data.channel);
    };
}

Repository.prototype = {
    findSongsPlays: function(title, performer, start, end, cb) {
        var cursor = this.collection.find({
            start: {$get: start},
            end: {$let: end},
            title: title,
            performer: performer
        });
        var items = [];
        cursor.each(function(err, data) {
            if (err) {
                cb('Error retrieving data');
            } else if (data === null) {
                cb(null, items);
            }
            items.push(new Play(data.title, data.performer, data.start, data.end, data.channel));
        });
    },
    findChannelPlays: function(start, end, cb) {
        var cursor = this.collection.find({
            start: {$get: start},
            end: {$let: end}
        });
        var items = [];
        cursor.each(function(err, data) {
            if (err) {
                cb('Error retrieving data');
            } else if (data === null) {
                cb(null, items);
            }
            items.push(new Play(data.title, data.performer, data.start, data.end, data.channel));
        });
    },
    findTopSongs: function(channels, start, end, limit, cb) {
        this.collection.aggregate([
            {$match: {
                channel: {$in: channels},
                start: {$gte: start},
                end: {$lte: end}
            }},
            {$group: {
                _id: {performer: '$performer', title: '$title'},
                playsAmount: {$sum: 1}
            }},
            {$sort: {playsAmount: -1}},
            {$limit: limit},
            {$project: {
                _id: 0,
                performer: '$_id.performer',
                title: '$_id.title',
                playsAmount: '$playsAmount'
            }}
            ], function(err, result) {
                cb(err, result);
            }
        );
    },
    findRankForSongs: function(songs, start, end) {
        var songsIndexes = [];
        for(var i = 0; i < songs.length; i++) {
            songsIndexes.push({
                title: songs[i].title,
                performer: songs[i].performer
            });
        }
        this.collection.aggregate(
            {$match: {
                _id: {$in: songsIndexes},
                start: {$get: start},
                end: {$let: end}
            }},
            {$group: {
                _id: {performer: '$performer', title: '$title'},
                playsAmount: {$sum: 1}
            }},
            {$match: {
                _id: {$in: songsIndexes}
            }},
            {$sort: {playsAmount: -1}},
            {$limit: limit},
            function(err, result) {
                if(err) {
                    cb('Error retrieving data')
                } else {
                    cb(null, result)
                }
            }
        );
    },
    persist: baseRepo.persist,
    find: baseRepo.find
};
