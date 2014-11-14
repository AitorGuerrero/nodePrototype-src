var performerPrototype = {
    addSong: function(song) {
        this.songs.push(song);
        return this;
    }
};
exports.New = function(name) {
    var performer = Object.create(performerPrototype, {
        name: {value: name, writable: true},
        songs: {value: []}
    });
    return performer;
}