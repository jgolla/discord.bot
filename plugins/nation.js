"use strict";

let nations = require('../nations.js');

module.exports = function(pluginParameters) {    
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