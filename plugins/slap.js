'use strict';

let utils = require('../utils.js');

module.exports = function(pluginParameters) {
    let foundUser = utils.getMentionFromName(pluginParameters.body, pluginParameters.bot);
    let message = getMessageForUser(foundUser, pluginParameters.message.author.toString());
    pluginParameters.message.channel.sendMessage(message);
};

function getMessageForUser(user, sender) {
    let messageList = [];
    if(!user) {
        messageList.push(`Who are you slapping now, ${sender}?`);
        messageList.push(`Want me to slap you, ${sender}?`);
        messageList.push(`${sender} is looking for someone to slap, any volunteers?`);
        messageList.push(`${sender} needs to be slapped, any volunteers?`);
        
        messageList.push(`*slaps ${sender} to the moon and back!*`);
        messageList.push(`*slaps ${sender} down to the Dungeon!*`);        
        messageList.push(`*dodges ${sender}'s slap!*`);
        messageList.push(`*trains ${sender} in slapping techniques!*`);
        messageList.push(`*slaps ${sender} around a bit with a large trout!*`);
        messageList.push(`*slaps ${sender} around a lot with a large smelly trout!*`);
    } else {
        messageList.push(`Why are you slapping ${user}, ${sender}?`);
        messageList.push(`Want me to slap ${user} for you, ${sender}?`);
        messageList.push(`${sender} is looking for someone to slap ${user}, any volunteers?`);
        messageList.push(`${user} needs to be slapped, any volunteers?`);
        
        messageList.push(`*slaps ${user} to the moon and back!*`);
        messageList.push(`*slaps ${user} down to the Dungeon!*`);
        messageList.push(`*wonders if slapping ${user} will really fix them...*`);
        messageList.push(`*slaps ${user} around a bit with a large trout!*`);
        messageList.push(`*slaps ${user} around a lot with a large smelly trout!*`);
    }

    return messageList.random();
}