"use strict";

module.exports = function(pluginParameters) {
    let helpList = 'Current commands: ';
    for(let prop in pluginParameters.plugins) {
        helpList += prop + ', ';
    }

    pluginParameters.bot.sendMessage(pluginParameters.channel, helpList.substr(0, helpList.length - 2));
};