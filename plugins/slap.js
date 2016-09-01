"use strict";

module.exports = function(pluginParameters) {
    let foundUser = pluginParameters.bot.findUser(pluginParameters.user);
    if(foundUser) {
        foundUser = foundUser.mention();
    } else {
        foundUser = pluginParameters.user;
    }

    pluginParameters.bot.sendMessage(pluginParameters.channel, `*slaps ${foundUser} with a fish*`);
};