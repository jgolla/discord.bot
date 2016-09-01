"use strict";

module.exports = function(plugginParameters) {
    let helpList = 'Current commands: ';
    for(let prop in plugginParameters.pluggins) {
        helpList += prop + ', ';
    }

    plugginParameters.bot.sendMessage(plugginParameters.channel, helpList.substr(0, helpList.length - 2));
};