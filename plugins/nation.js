'use strict';

let nations = require('../nations.js');

function action(pluginParameters) {    
    let nationsByName = nations.filter((nation) => nation['Nation Name'].toLowerCase().indexOf(pluginParameters.body.toLowerCase()) !== -1).slice(0, 5);
    if(nationsByName.length > 0) {
        pluginParameters.message.channel.sendMessage('Matching nations names:').then(() => {
            nationsByName.forEach((nation) => pluginParameters.message.channel.sendMessage('Nation name: ' + nation['Nation Name'] + ' ' + nation.getCNLink()));
        });
    }

    let nationsByRuler = nations.filter((nation) => nation['Ruler Name'].toLowerCase().indexOf(pluginParameters.body.toLowerCase()) !== -1).slice(0, 5);
    if(nationsByRuler.length > 0) {
        pluginParameters.message.channel.sendMessage('Matching ruler names:').then(() => {
            nationsByRuler.forEach((nation) => pluginParameters.message.channel.sendMessage('Ruler name: ' + nation['Ruler Name'] + ' ' + nation.getCNLink()));
        });
    }
}

function help(pluginParameters) {
    pluginParameters.message.channel.sendMessage('Usage: !nation <nation name or ruler name>');
}

module.exports = {
    action: action,
    help: help
};