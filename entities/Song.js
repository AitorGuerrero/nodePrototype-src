exports.New = function(name) {
    var song = Object.create({}, {
        name: {value: name, writable: true}
    });
    return song;
}