exports.New = function(name) {
    var channel = Object.create({}, {
        name: {value: name, writable: true}
    });
    return channel;
}