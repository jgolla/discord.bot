'use strict';

let http = require('http');

module.exports = function(pluginParameters) {

    http.get('http://api.icndb.com/jokes/random', function(response) {

        // Continuously update stream with data
        let body = '';
        response.on('data', (d) => body += d);
        response.on('end', function() {
            let parsed = JSON.parse(body);
            pluginParameters.message.channel.sendMessage(parsed.value.joke);
        });        
    });  
};
