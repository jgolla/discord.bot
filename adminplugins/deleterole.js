"use strict";

module.exports = function (pluginParameters) {
    let server = pluginParameters.message.guild;
    let role = server.roles.find('name', pluginParameters.body);
    if(role) {
        role.delete().then(() => pluginParameters.message.channel.sendMessage(`${pluginParameters.body} deleted`)).catch(console.log);
    } 
};