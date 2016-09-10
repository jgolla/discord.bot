'use strict';

let http = require('http');
let https = require('https');

function action(pluginParameters) {
    if(pluginParameters.body) {
        let request = http;
        if(pluginParameters.body.startsWith('https')) {
            request = https;
        }

        request.get(pluginParameters.body, function(response) {

            // Continuously update stream with data
            let data = [];
            response.on('data', (d) => {
                data = [].concat.apply(data, d);
            });

            response.on('end', function() {
                let image = new Buffer(data, 'binary');
                // set avatar
                pluginParameters.bot.user.setAvatar(image)
                    .then(user => pluginParameters.message.channel.sendMessage('<--- Check out my new look'))
                    .catch(console.log);
            });        
        });  
    } else {
        help(pluginParameters);
    }
}

function help(pluginParameters) {
    pluginParameters.message.channel.sendMessage('Usage: `!avatar <URL>`');
}

module.exports = {
    action: action,
    help: help
};