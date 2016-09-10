'use strict';

function action(pluginParameters) {
    let activeUsers = pluginParameters.bot.users.filter(user => user.status === 'online').map(user => user.username);
    pluginParameters.message.channel.sendMessage(activeUsers.join(', '));
}

function help(pluginParameters) {
    pluginParameters.message.channel.sendMessage('Usage: `!active`');
}

module.exports = {
    action: action,
    help: help
};