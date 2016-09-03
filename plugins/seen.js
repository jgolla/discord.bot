"use strict";

module.exports = function(pluginParameters) {
    let foundUser = pluginParameters.bot.findUser(pluginParameters.body);
    if(foundUser) {
        foundUser = foundUser.mention();
        pluginParameters.db.find({nick: foundUser}, (err, docs) => {
            if(docs.length === 1) {
                pluginParameters.bot.sendMessage(pluginParameters.message.channel, `I last saw ${foundUser} on ${docs[0].lastSeen}`);
                return;
            } else {
                pluginParameters.bot.sendMessage(pluginParameters.message.channel, `I have not seen ${foundUser}`);
            }
        });
    } else {
        pluginParameters.bot.sendMessage(pluginParameters.message.channel, `I have not seen ${foundUser}`);
    }
};