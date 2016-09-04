"use strict";

module.exports = function(pluginParameters) {
    let message = getMessage();
    pluginParameters.bot.sendMessage(pluginParameters.message.channel, message);
};

function getMessage(user, sender) {
    let messageList = [
        'It is certain',
        'It is decidedly so',
        'Without a doubt',
        'Yes, definitely',
        'You may rely on it',
        'As I see it, yes',
        'Most likely',
        'Outlook good',
        'Yes',
        'Signs point to yes',
        'Reply hazy try again',
        'Ask again later',
        'Better not tell you now',
        'Cannot predict now',
        'Concentrate and ask again',
        'Don\'t count on it',
        'My reply is no',
        'My sources say no',
        'Outlook not so good',
        'Very doubtful'
    ];

    let index = Math.floor(Math.random() * messageList.length);
    return messageList[index];
}