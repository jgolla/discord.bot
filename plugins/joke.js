"use strict";

let http = require('http');

module.exports = function(pluginParameters) {

    http.get('http://api.icndb.com/jokes/random', function(response) {

        // Continuously update stream with data
        var body = '';
        response.on('data', (d) => body += d);
        response.on('end', function() {
            var parsed = JSON.parse(body);
            pluginParameters.bot.sendMessage(pluginParameters.message.channel, parsed.value.joke);
        });        
    });  
};
