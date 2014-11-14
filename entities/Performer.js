exports.New = function(name) {
    var performer = Object.create({});
    performer.name = name;
    return performer;
}