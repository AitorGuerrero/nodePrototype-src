exports = module.exports = Song;

function Song(name) {
    var song = Object.create({}, {
        name: {value: name, writable: true}
    });
    return song;
}