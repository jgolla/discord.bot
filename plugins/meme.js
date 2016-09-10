'use strict';

function action(pluginParameters) {
    let parameters = [];
    if(pluginParameters.body) {
        parameters = pluginParameters.body.toLowerCase().split(':');
    }

    if (parameters.length < 2) {
        help(pluginParameters);
    } else if(parameters.length >= 2) {
        let meme = parameters[0];
        let top = parameters[1];
        let bottom = parameters[2] || ' ';
        pluginParameters.message.channel.sendFile(`https://memegen.link/${meme}/${top}/${bottom}.jpg`);
    }
}

function help(pluginParameters) {
    pluginParameters.message.channel.sendMessage('Usage: !meme <templatename>:<toptext>:<bottomtext>\nSee https://memegen.link/templates/ for a list of available memes.');
}

module.exports = {
    action: action,
    help: help
};