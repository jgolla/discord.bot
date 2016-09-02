"use strict";

module.exports = function(pluginParameters) {
    let foundUser;
    if(pluginParameters.body) {
        foundUser = pluginParameters.bot.findUser(pluginParameters.body);
        if(foundUser) {
            foundUser = foundUser.mention();
        } else {
            foundUser = pluginParameters.body;
        }
    }

    let message = getMessageForUser(foundUser, pluginParameters.message.author.mention());
    pluginParameters.bot.sendMessage(pluginParameters.message.channel, message);
};

function getMessageForUser(user, sender) {
    let messageList = [];
    if(!user) {
        messageList.push(`I'm HOT and you are NOT!`);
        messageList.push(`LordofDarkness[NPO]> it can't be HOT without jgolla`);
        messageList.push(`I'm sexy and I know it!`);
        messageList.push(`Oh yes, you are you sexy beast!`);
        messageList.push(`is it nekkid time?`);
        messageList.push(`Elegarth is a GOD!`);
        messageList.push(`If I could rearrange the alphabet, I'd put U and I together ;)`);
        messageList.push(`Is it HOT in here or is it just me?`);

        messageList.push(`*streaks across the channel NEKKID!*`);
        messageList.push(`*is panting uncontrollably*`);
        messageList.push(`*removes pants*`);
        messageList.push(`*does a sexy dance*`);
        messageList.push(`*and ${sender}, sitting in a tree...*`);
        messageList.push(`*thinks ${sender} is right, is getting hot in here, so we'll take all our clothes...*`);
    } else {
        messageList.push(`I'm HOT and ${user} is NOT!`);
        messageList.push(`${user} is sexy and I know it!`);
        messageList.push(`is it nekkid time with ${user}?`);
        messageList.push(`If I could rearrange the alphabet, I'd put U and I together ;), ${user}`);
        messageList.push(`Have you idea how hot you look today, ${user}?`);
        messageList.push(`Someone open a window, ${user} is here!`);

        messageList.push(`*believes ${sender} and ${user} look hot together*`);
        messageList.push(`*whistles at ${user} nekkid pictures!*`);
        messageList.push(`*removes ${user}'s pants*`);
        messageList.push(`*does a sexy dance with ${user}*`);
        messageList.push(`*does a sexy dance for ${user}*`);
    }

    let index = Math.floor(Math.random() * messageList.length);
    return messageList[index];
}