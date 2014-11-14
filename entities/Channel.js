exports.New = function(name) {
    var channel = Object.create({});
    channel.name = name;
    return channel;
}