'use strict';

function helpList(pluginParameters) {
    if(!pluginParameters.body) {
        let helpList = 'Current commands: ';
        for(let prop in pluginParameters.plugins) {
            // only show help for plugins that have actions
            if(pluginParameters.plugins[prop].action) {
                helpList += prop + ', ';
            }
        }
        
        pluginParameters.message.channel.sendMessage(helpList.substr(0, helpList.length - 2));
    } else {
        if(pluginParameters.plugins[pluginParameters.body] && pluginParameters.plugins[pluginParameters.body].help) {
            pluginParameters.plugins[pluginParameters.body].help(pluginParameters);
        }
    }
}

function help(pluginParameters) {
    pluginParameters.message.channel.sendMessage('Usage: `!help` or `!help <COMMAND>`');
}

module.exports = {
    action: helpList,
    help: help
};