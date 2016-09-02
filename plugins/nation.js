"use strict";

let fs = require('fs');
let nations;

module.exports = function(pluginParameters) {
    if(!nations) {
        nations = parseFile(__dirname + '/CyberNations_SE_Nation_Stats.txt', Nation);
    }
    
    let nationsByName = nations.filter((nation) => nation['Nation Name'].toLowerCase().indexOf(pluginParameters.body.toLowerCase()) !== -1).slice(0, 5);
    if(nationsByName.length > 0) {
        pluginParameters.bot.sendMessage(pluginParameters.message.channel, 'Matching nations names:').then(() => {
            nationsByName.forEach((nation) => pluginParameters.bot.sendMessage(pluginParameters.message.channel, 'Nation name: ' + nation['Nation Name'] + ' ' + nation.getCNLink()));
        });
    }

    let nationsByRuler = nations.filter((nation) => nation['Ruler Name'].toLowerCase().indexOf(pluginParameters.body.toLowerCase()) !== -1).slice(0, 5);
    if(nationsByRuler.length > 0) {
        pluginParameters.bot.sendMessage(pluginParameters.message.channel, 'Matching ruler names:').then(() => {
            nationsByRuler.forEach((nation) => pluginParameters.bot.sendMessage(pluginParameters.message.channel, 'Ruler name: ' + nation['Ruler Name'] + ' ' + nation.getCNLink()));
        });
    }
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