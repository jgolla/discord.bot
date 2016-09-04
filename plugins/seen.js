"use strict";

module.exports = function(pluginParameters) {
    let foundUser = pluginParameters.bot.users.find('username', pluginParameters.body);
    if(foundUser) {
        foundUser = foundUser.toString();
        pluginParameters.db.find({nick: foundUser}, (err, docs) => {
            if(docs.length === 1) {
                let lastSeen = docs[0].lastSeen;
                if(lastSeen !== "now") {
                    lastSeen = "on " + lastSeen;
                }

                pluginParameters.message.channel.sendMessage(`I last saw ${foundUser} ${lastSeen}`);
                return;
            } else {
                pluginParameters.message.channel.sendMessage(`I have not seen ${foundUser}`);
            }
        });
    } else {
        pluginParameters.message.channel.sendMessage(`I have not seen ${pluginParameters.body}`);
    }
};