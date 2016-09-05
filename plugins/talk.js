'use strict';

let Cleverbot = require('cleverbot-node');
let cleverbot = new Cleverbot();
let setupResponder = false;

module.exports = function(pluginParameters) {

    if(!setupResponder) {
        setupResponder = true;
        pluginParameters.bot.on('message', function(message) {
            if(message.content.indexOf(pluginParameters.bot.user) !== -1) {
                let cleanedMessage = message.content.replace(pluginParameters.bot.user, '');
                Cleverbot.prepare(function(){
                    cleverbot.write(cleanedMessage, function (response) {
                        pluginParameters.message.channel.sendMessage(response.message);
                    });
                });
            }
        });
    }

    Cleverbot.prepare(function(){
        cleverbot.write(pluginParameters.body, function (response) {
            pluginParameters.message.channel.sendMessage(response.message);
        });
    });
};