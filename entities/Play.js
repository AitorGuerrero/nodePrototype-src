exports.New = function(title, performer, start, end, channel) {
    var song = Object.create({}, {
        title: {value: title, writable: true},
        performer: {value: performer, writable: true},
        start: {value: start, writable: true},
        end: {value: end, writable: true},
        channel: {value: channel, writable: true}
    });
    return song;
}