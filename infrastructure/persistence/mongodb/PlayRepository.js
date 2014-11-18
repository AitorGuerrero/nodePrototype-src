var Play = require('../../../entities/Play');
exports.New = function(db) {
    'use strict';
    var repository = require('./BaseRepository').New(db, 'play');
    repository.parseEntity = function(data) {
        return new Play(data.title, data.performer, data.start, data.end, data.channel);
    };
    repository.findSongsPlays = function(title, performer, start, end, cb) {
        var cursor = this.collection.find({
            start: {$gt: start},
            end: {$lt: end},
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
    };
    repository.findChannelPlays = function(start, end, cb) {
        var cursor = this.collection.find({
            start: {$gt: start},
            end: {$lt: end}
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
    };
    return repository;
}