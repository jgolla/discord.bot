"use strict";

let nations = require('../nations.js');

module.exports = function(pluginParameters) {
    if(!pluginParameters.body) {
        pluginParameters.bot.sendMessage(pluginParameters.message.channel, 'Usage: !resources <resource> <optional_resource>');
        return;
    }

    let desiredResources = pluginParameters.body.toLowerCase().split(' ');
    let matchBoth = desiredResources.length === 2;

    let activeUsers = pluginParameters.bot.users.filter(user => user.status === 'online').map(user => user.mention());
    let entry = pluginParameters.db.find({ nick: { $in: activeUsers } }, (err, docs) => {
        docs.forEach((entry) => {            
            let matchingNation = nations.filter((nation) => nation['Nation ID'] === entry.nationid)[0];

            if(!matchBoth) {
                if(desiredResources[0] === matchingNation['Resource 1'].toLowerCase() || desiredResources[0] === matchingNation['Resource 2'].toLowerCase()) {
                    pluginParameters.bot.sendMessage(pluginParameters.message.channel, pluginParameters.message.author + ' you could trade with ' + entry.nick);
                }
            } else {
                if((desiredResources[0] === matchingNation['Resource 1'].toLowerCase() || desiredResources[0] === matchingNation['Resource 2'].toLowerCase()) &&
                (desiredResources[1] === matchingNation['Resource 1'].toLowerCase() || desiredResources[1] === matchingNation['Resource 2'].toLowerCase())) {
                    pluginParameters.bot.sendMessage(pluginParameters.message.channel, pluginParameters.message.author + ' you could trade with ' + entry.nick);
                }
            }
        });
    });
};