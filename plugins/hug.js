"use strict";

module.exports = function(pluginParameters) {
    let foundUser = pluginParameters.bot.findUser(pluginParameters.body);
    if(foundUser) {
        foundUser = foundUser.mention();
    } else {
        foundUser = pluginParameters.body;
    }

    pluginParameters.bot.sendMessage(pluginParameters.message.channel, `*hugs ${foundUser}*`);
};