"use strict";

module.exports = function (pluginParameters) {
    let activeUsers = pluginParameters.bot.users.filter(user => user.status === 'online').map(user => user.username);
    pluginParameters.bot.sendMessage(pluginParameters.channel, activeUsers.join(', '));
};