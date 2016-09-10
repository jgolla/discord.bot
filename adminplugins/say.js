'use strict';

function action(pluginParameters) {
    if(pluginParameters.body) {
        let params = pluginParameters.body.split(':');
        if(params.length === 2) {
            var channels = pluginParameters.bot.channels.filter((chan) => chan.type === 'text' && chan.name.toLowerCase() === params[0].toLowerCase());
            if(channels.first()) {
                channels.first().sendMessage(params[1]);
            } else {
                help(pluginParameters);
            }
        }
    } else {
        help(pluginParameters);
    }
}

function help(pluginParameters) {
    pluginParameters.message.channel.sendMessage('Usage: `!say <channel>:<message>`');
}

module.exports = {
    action: action,
    help: help
};