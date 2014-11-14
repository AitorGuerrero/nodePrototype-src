exports.New = function(name) {
    var song = Object.create({});
    song.name = name;
    return song;
}