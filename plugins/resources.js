"use strict";

let fs = require('fs');
let nations;

module.exports = function(pluginParameters) {
    if(!nations) {
        nations = parseFile(__dirname + '/CyberNations_SE_Nation_Stats.txt', Nation);
    }

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

function parseFile(fileName, base) {
    let lines = fs.readFileSync(fileName).toString().split('\n');

    let properties = lines[0].split('|');
    // remove /r from the end
    properties.pop();

    lines = lines.slice(1);

    let nations = [];
    lines.forEach(function(item) {
        if(item) {
            let splitLine = item.split('|');
            let nation;
            
            if(base) {
                nation = new base();
            } else {
                nation = {};
            }

            for(let i = 0; i < properties.length; i++) {
                nation[properties[i]] = splitLine[i];
            }

            nations.push(nation);
        }
    });

    return nations;
}

function Nation() {};
Nation.prototype.getCNLink = function() {
    return 'http://www.cybernations.net/nation_drill_display.asp?Nation_ID=' + this['Nation ID'];
};