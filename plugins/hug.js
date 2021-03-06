'use strict';

let utils = require('../utils.js');

function hug(pluginParameters) {
    let foundUser = utils.getMentionFromName(pluginParameters.body, pluginParameters.bot);
    pluginParameters.message.channel.sendMessage(`*hugs ${foundUser}*`);
};

function help(pluginParameters) {
    pluginParameters.message.channel.sendMessage('Usage: `!hug <user>`');
}

module.exports = {
    action: hug,
    help: help
};