'use strict';

let Cleverbot = require('cleverbot-node');
let cleverbot = new Cleverbot();
let setupResponder = false;

module.exports = {
    action: action,
    help: help,
    init: init
}

function init(pluginParameters) {
    pluginParameters.bot.on('message', (message) => {  
        if (message.author === pluginParameters.bot.user) {
            return;
        }
        
        if (message.content.indexOf(pluginParameters.bot.user) !== -1 || message.channel.type === 'dm') {
            let cleanedMessage = message.content.replace(pluginParameters.bot.user, '');
            Cleverbot.prepare(() => {
                cleverbot.write(cleanedMessage, (response) => {
                    message.channel.sendMessage(response.message);
                });
            });
        }
    });
}

function action(pluginParameters) {
    Cleverbot.prepare(() => {
        cleverbot.write(pluginParameters.body, (response) => {
            pluginParameters.message.channel.sendMessage(response.message);
        });
    });
};

function help(pluginParameters) {
    pluginParameters.message.channel.sendMessage('Usage: `!talk <say something>` or `@mention the bot` or `DM the bot`');
}