exports = module.exports = Command;

function Command(playsRepo) {
    this.playsRepo = playsRepo;
}

Command.prototype = {
    exec: function(request, cb) {
        this.playsRepo.findSongsPlays(
            request.title,
            request.performer,
            request.start,
            request.end,
            function(err, results) {
                var output = [];
                for (var i = 0; i < results.length; i++) {
                    output.push({
                        channel: results[i].channel,
                        start: results[i].start,
                        end: results[i].end
                    });
                }
                cb(null, output);
            }
        );
    }
}