"use strict";

module.exports = function (pluginParameters) {
    let server = pluginParameters.bot.guilds.first();
    let role = server.roles.find('name', pluginParameters.body);
    if(!role) {
        server.createRole({
            name: pluginParameters.body		
        }).then((role) => {
            role.edit({ name: pluginParameters.body, color: '0' }).then(() => pluginParameters.message.channel.sendMessage(`Created role ${pluginParameters.body} `)).catch(console.log); 
        }).catch(console.log);
    } else {
        pluginParameters.message.channel.sendMessage(`${pluginParameters.body} already exists`);
    }
};