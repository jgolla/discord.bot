"use strict";

module.exports = function(pluginParameters) {
    let foundUser = pluginParameters.bot.findUser(pluginParameters.user);
    if(foundUser) {
        foundUser = foundUser.mention();
    } else {
        foundUser = pluginParameters.user;
    }

    pluginParameters.bot.sendMessage(pluginParameters.channel, `:beer: ... have a beer, ${foundUser}`);
};