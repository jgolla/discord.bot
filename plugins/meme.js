"use strict";

module.exports = function(pluginParameters) {
    let parameters = pluginParameters.body.toLowerCase().split(':');
    if (parameters.length < 2) {
        pluginParameters.bot.sendMessage(pluginParameters.message.channel, 'Usage: !meme <templatename>:<toptext>:<bottomtext>\nSee https://memegen.link/templates/ for a list of available memes.');
    } else if(parameters.length >= 2) {
        let meme = parameters[0];
        let top = parameters[1];
        let bottom = parameters[2] || ' ';
        pluginParameters.bot.sendMessage(pluginParameters.message.channel, { file : {file: `https://memegen.link/${meme}/${top}/${bottom}.jpg` }});
    }
}