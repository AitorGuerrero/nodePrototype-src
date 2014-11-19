module.exports = Query;

function Query (playsrepository) {
    this.playsRepository = playsrepository;
}

Query.prototype = {
    exec: function(request, cb) {
        this.playsRepository.findTopSongs(
            request.channels,
            request.start,
            request.end,
            request.limit,
            function(err, songs) {
                songs = this.setRank(songs);
                this.getPreviousRank(songs, request, cb);
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
        return indexedSongs;
    },
    setRank: function(songs) {
        for(var i = 0; i < songs.length; i++) {
            songs[i].rank = i + 1;
        }
        return songs;
    },
    getPreviousRank: function(songs, request, cb) {
        var indexedSongs = this.indexizeSongs(songs),
            dateDif = request.end.getTime() - request.start.getTime(),
            start = new Date(request.start.getTime() - dateDif),
            end = request.start;
        this.playsRepository.findTopSongs(
            request.channels,
            start,
            end,
            request.limit,
            function(err, previousSongs) {
                var perf, tit, i;
                previousSongs = this.setRank(previousSongs);
                for(i = 0; i < songs.length; i++) {
                    perf = previousSongs[i].performer;
                    tit = previousSongs[i].title;
                    if (indexedSongs[perf] && indexedSongs[perf][tit]) {
                        indexedSongs[perf][tit].previousRank = previousSongs[i].rank;
                        indexedSongs[perf][tit].previousPlaysAmount = previousSongs[i].playsAmount;
                    }
                }
                cb(null, songs);
            }.bind(this));
    }
}