'use strict';

let utils = require('../utils.js');

function action(pluginParameters) {
    if(!pluginParameters.body) {
        help(pluginParameters);
        return;
    }
    
    let foundUser = pluginParameters.bot.users.find('username', pluginParameters.body);
    if(foundUser) {
        foundUser = foundUser.toString();
        pluginParameters.db.find({nick: foundUser}, (err, docs) => {
            if(docs.length === 1) {
                let lastSeen = docs[0].lastSeen;
                if(lastSeen !== "now") {
                    lastSeen = "on " + lastSeen;
                }

                pluginParameters.message.channel.sendMessage(`I last saw ${pluginParameters.body} ${lastSeen}`);
                return;
            } else {
                pluginParameters.message.channel.sendMessage(`I have not seen ${pluginParameters.body}`);
            }
        });
    } else {
        pluginParameters.message.channel.sendMessage(`I have not seen ${pluginParameters.body}`);
    }
}

function help(pluginParameters) {
    pluginParameters.message.channel.sendMessage('Usage: `!seen <user>`'); 
}

module.exports = {
    action: action,
    help: help
};