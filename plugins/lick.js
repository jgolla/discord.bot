'use strict';

let utils = require('../utils.js');

function action(pluginParameters) {
    let foundUser = utils.getMentionFromName(pluginParameters.body, pluginParameters.bot);
    let message = getMessageForUser(foundUser, pluginParameters.message.author.toString());
    pluginParameters.message.channel.sendMessage(message);
};

function help(pluginParameters) {
    pluginParameters.message.channel.sendMessage('Usage: `!lick` or `!lick <user>`');
}

function getMessageForUser(user, sender) {
    let messageList = [];
    if(!user) {
        messageList.push(`That isn't hygienic, ${sender}!`);
        messageList.push(`Clean that out ${sender}!`);
        messageList.push(`Excessive licking is evil, ${sender}!`);
        messageList.push(`Who do you want to lick, ${sender}?`);
        messageList.push(`${sender} tastes like roast beef...`);

        messageList.push(`*licks ${sender} from top to bottom!*`);
        messageList.push(`*pulls ${sender}'s tongue out!*`);
        messageList.push(`*watches as ${sender} licks themself clean.*`);
        messageList.push(`*stares at ${sender}'s licking attempts in disbelief...*`);
        messageList.push(`*didn't liked being licked by ${sender}...*`);
    } else {
        messageList.push(`Hey ${user}, ${sender} wants to lick you!`);
        messageList.push(`Clean ${user}, ${sender}, and no more licking!`);
        messageList.push(`You usually lick each other much, ${user} and ${sender}?`);
        messageList.push(`You really want me to lick ${user}?`);
        messageList.push(`${user} tastes like roast beef...`);

        messageList.push(`*licks ${user} from top to bottom and everything in between!*`);
        messageList.push(`*pulls ${sender}'s tongue out, for licking ${user}!*`);
        messageList.push(`*pulls ${user}'s tongue out, for licking ${sender}!*`);
        messageList.push(`*watches as ${sender} licks ${user}!*`);
        messageList.push(`*stares at ${user} licking technique...*`);
        messageList.push(`*licks itself rather than licking ${user}*`);
    }

    return messageList.random();
}

module.exports = {
    action: action,
    help: help
};