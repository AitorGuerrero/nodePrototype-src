module.exports = Query;

function Query (playsrepository) {
    this.playsRepository = playsrepository;
}

Query.prototype = {
    execute: function(request, cb) {
        this.playsRepository.findTopSongs(
            request.channels,
            request.start,
            request.end,
            request.limit,
            function(err, songs) {
                var indexedSongs = this.indexizeSongs(songs);
                this.playsRepository.findRankForSongs(songs, function(err, lastRanks) {
                    if (err) {
                        cb(err);
                    } else {
                        var i, rank, song;
                        for(i = 0; i < lastRanks.length; i++) {
                            rank = lastRanks[i];
                            song = indexedSongs[rank.performer][rank.title];
                            song.previous_plays = rank.plays;
                            song.previous_rank = rank.rank;
                        }
                        cb(null, songs);
                    }
                })
            }.bind(this)
        );
    },
    indexizeSongs: function(songs) {
        var i, indexedSongs = {};
        for(i = 0; i < songs.length; i++) {
            if(typeof(indexedSongs[songs[i].performer]) === 'undefined') {
                indexedSongs[songs[i].performer] = {};
            }
            indexedSongs[songs[i].performer][songs[i].title] = songs[i];
        }
        return songs;
    }
}