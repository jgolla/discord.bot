'use strict';

let utils = require('../utils.js');

module.exports = function(pluginParameters) {
    let foundUser = utils.getMentionFromName(pluginParameters.body, pluginParameters.bot);
    pluginParameters.message.channel.sendMessage(`*hugs ${foundUser}*`);
};