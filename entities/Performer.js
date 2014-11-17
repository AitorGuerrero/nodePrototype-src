exports = module.exports = Performer;

function Performer (name) {
    this.name = name;
    this.songs = [];
}

Performer.prototype = {
    addSong: function(song) {
        this.songs.push(song);
        return this;
    }
};