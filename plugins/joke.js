'use strict';

let http = require('http');

function action(pluginParameters) {

    http.get('http://api.icndb.com/jokes/random', function(response) {

        // Continuously update stream with data
        let body = '';
        response.on('data', (d) => body += d);
        response.on('end', function() {
            let parsed = JSON.parse(body);
            pluginParameters.message.channel.sendMessage(parsed.value.joke);
        });        
    });  
}

function help(pluginParameters) {
    pluginParameters.message.channel.sendMessage('Usage: !joke');
}

module.exports = {
    action: action,
    help: help
};