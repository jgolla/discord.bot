'use strict';

function action(pluginParameters) {
    let server = pluginParameters.message.guild;
    let role = server.roles.find('name', pluginParameters.body);
    if(role) {
        role.delete().then(() => pluginParameters.message.channel.sendMessage(`${pluginParameters.body} deleted`)).catch(console.log);
    } 
}

function help(pluginParameters) {
    pluginParameters.message.channel.sendMessage('Usage: `!deleterole <role>`');
}

module.exports = {
    action: action,
    help: help
};