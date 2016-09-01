"use strict";

module.exports = function (pluginParameters) {
    let server = pluginParameters.bot.servers[0];
    let params = pluginParameters.body.split(':');
    let role = server.roles.get('name', params[0]);
    if(role) {
        let user = pluginParameters.bot.findUser(params[1]);
        pluginParameters.bot.addMemberToRole(user, role, (err) => err && console.log(err)).then(() => pluginParameters.bot.sendMessage(pluginParameters.channel, `${params[1]} added to role ${params[0]}`));
    } else {
        pluginParameters.bot.sendMessage(pluginParameters.channel, `Could not find role ${params[0]}`)
    }
};