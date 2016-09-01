"use strict";

module.exports = function (pluginParameters) {
    let server = pluginParameters.bot.servers[0];
    let role = server.roles.get('name', pluginParameters.body);
    if(!role) {
        pluginParameters.bot.createRole(server, {
            name: pluginParameters.body		
        }).then(() =>  pluginParameters.bot.sendMessage(pluginParameters.message.channel, `Created role ${pluginParameters.body} `));
    } else {
        pluginParameters.bot.sendMessage(pluginParameters.message.channel, `${pluginParameters.body} already exists`);
    }
};