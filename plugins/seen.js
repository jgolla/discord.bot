"use strict";

module.exports = function(pluginParameters) {
    let foundUser = pluginParameters.bot.findUser(pluginParameters.body);
    if(foundUser) {
        foundUser = foundUser.mention();
        pluginParameters.db.find({nick: foundUser}, (err, docs) => {
            if(docs.length === 1) {
                let lastSeen = docs[0].lastSeen;
                if(lastSeen !== "now") {
                    lastSeen = "on " + lastSeen;
                }

                pluginParameters.bot.sendMessage(pluginParameters.message.channel, `I last saw ${foundUser} ${lastSeen}`);
                return;
            } else {
                pluginParameters.bot.sendMessage(pluginParameters.message.channel, `I have not seen ${foundUser}`);
            }
        });
    } else {
        pluginParameters.bot.sendMessage(pluginParameters.message.channel, `I have not seen ${pluginParameters.body}`);
    }
};