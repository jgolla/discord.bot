'use strict';

function action(pluginParameters) {
    let server = pluginParameters.message.guild;
    let params = pluginParameters.body.split(':');
    let role = server.roles.find('name', params[0]);
    if(role) {
        let user = pluginParameters.bot.users.find('username', params[1]);
        let guildMember = pluginParameters.message.channel.guild.members.find('user', user);
        let newRoles = guildMember.roles.array();
        newRoles.push(role);
        guildMember.setRoles(newRoles).then((role) => pluginParameters.message.channel.sendMessage(`${params[1]} added to role ${params[0]}`)).catch(console.log);
    } else {
        pluginParameters.message.channel.sendMessage(`Could not find role ${params[0]}`)
    }
}

function help(pluginParameters) {
    pluginParameters.message.channel.sendMessage('Usage: `!addtorole <role>:<user>`');
}

module.exports = {
    action: action,
    help: help
};