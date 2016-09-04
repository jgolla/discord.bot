"use strict";

module.exports = function(pluginParameters) {
    let foundUser = pluginParameters.bot.users.find('username', pluginParameters.body);
    if(foundUser) {
        foundUser = foundUser.toString();
    } else {
        foundUser = pluginParameters.body;
    }

    pluginParameters.message.channel.sendMessage(`*hugs ${foundUser}*`);
};