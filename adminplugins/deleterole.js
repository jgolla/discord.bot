"use strict";

module.exports = function (pluginParameters) {
    let server = pluginParameters.bot.servers[0];
    let role = server.roles.get('name', pluginParameters.body);
    if(role) {
        role.delete().then(() => pluginParameters.bot.sendMessage(pluginParameters.channel, `${pluginParameters.body} deleted`));
    } 
};