"use strict";

module.exports = function(pluginParameters) {
    let message = 'Usage is !say <channel>:<message>';
    let channel = pluginParameters.message.channel;

    if(pluginParameters.body) {
        let params = pluginParameters.body.split(':');
        if(params.length === 2) {
            var channels = pluginParameters.bot.channels.filter((chan) => chan.type === 'text' && chan.name.toLowerCase() === params[0].toLowerCase());
            if(channels.first()) {
                channel = channels.first();
                message = params[1];
            }
        }
    }

    channel.sendMessage(message);
};