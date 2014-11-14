var performerPrototype = {
    addSong: function(song) {
        this.songs.push(song);
    }
};
exports.New = function(name) {
    var performer = Object.create(performerPrototype);
    performer.name = name;
    performer.songs = [];
    return performer;
}