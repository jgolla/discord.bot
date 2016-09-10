'use strict';

function action(pluginParameters) {
    pluginParameters.plugins['8ball'].action(pluginParameters);
    pluginParameters.plugins['beer'].action(pluginParameters);
    pluginParameters.plugins['dungeon'].action(pluginParameters);
    pluginParameters.plugins['help'].action(pluginParameters);
    pluginParameters.plugins['hot'].action(pluginParameters);
    pluginParameters.plugins['hug'].action(pluginParameters);
    pluginParameters.plugins['joke'].action(pluginParameters);
    pluginParameters.plugins['lick'].action(pluginParameters);
    pluginParameters.plugins['meme'].action(pluginParameters);
    pluginParameters.plugins['rps'].action(pluginParameters);
    pluginParameters.plugins['seen'].action(pluginParameters);
    pluginParameters.plugins['slap'].action(pluginParameters);
    pluginParameters.plugins['talk'].action(pluginParameters);
}

function help(pluginParameters) {
}

/*
module.exports = {
    action: action,
    help: help
};
*/