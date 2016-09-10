'use strict';

let utils = require('../utils.js');

function action(pluginParameters) {
    let foundUser = utils.getMentionFromName(pluginParameters.body, pluginParameters.bot);
    let message = getMessageForUser(foundUser, pluginParameters.message.author.toString());
    pluginParameters.message.channel.sendMessage(message);
}

function help(pluginParameters) {
    pluginParameters.message.channel.sendMessage('Usage: `!beer` or `!beer <user>`');
}

function getMessageForUser(user, sender) {
    let messageList = [];
    if(!user) {
        // messages
        messageList.push("Is that a beer in your pocket or are you happy to see me?");
        messageList.push("I can haz beer too?");
        messageList.push("Do you know what's fun about being sober? NOTHING! Have a beer!");
        messageList.push("If beer pong was a sport, I'd have a full scholarship");
        messageList.push("Hold my beer, watch this!");
        messageList.push("If beer, coffee, or a nap can't cure it, you've got a serious problem.");
        messageList.push("Alcohol is never the answer... But it does make you forget the question");
        messageList.push("Love has 4 letters, but then again so does beer");
        messageList.push("Money can't buy happiness, well unless you're buying beer.");
        messageList.push("Beer does't make you fat... it makes you lean... on tables, chairs and random people");
        messageList.push("Beauty is in the eye of the beer holder");
        messageList.push("Never text while driving. You might spill your beer!");
        messageList.push("Some things are better left unsaid, but I'll probably get drunk and say them anyway.");
        messageList.push("My body is not a temple... it's a microbrewery with legs");
        messageList.push("No! for the last time stop asking if i am drunk. I am not drunk! Who would name their kid drunk?");
        messageList.push("A man's got to believe in something. I believe I'll have another beer");
        messageList.push("Girl, this isn't a beer belly, its a fuel tank for my love machine!");
        messageList.push("BEER ME BABY!");

        // actions
        messageList.push("*pops the top off a cold beer*");
        messageList.push("*wants a beer too!*");
        messageList.push("*will work for beer*");
        messageList.push("*tosses a cold beer to everyone in the room*");
        messageList.push("*hands you his warm beer*");
        messageList.push("*announces free beer for everyone!*");
    } else {
        if(user !== sender)
        {
            messageList.push(`Hey ${user}, ${sender} wants to give you all their beer!`);
            messageList.push(`${user}, ${sender} wants another beer`);
            messageList.push(`Your credit card was rejected ${sender}, I'll charge ${user} for it!`);
            messageList.push(`${user} stole your wallet, ${sender}. He spend it all in beer!`);
        }       

        messageList.push(`*tosses ${user} a cold one from the ice chest.*`);
        messageList.push(`*tosses a beer to ${user}*`);
        messageList.push(`*reluctantly gives ${user} his last beer*`);
        messageList.push(`*removes a bottle of Guiness from the fridge and hands it to ${user}!*`);
        messageList.push(`*tosses ${user} another cold beer.*`);
        messageList.push(`*pours a frosty mug of Guiness for ${user}.*`);
        messageList.push(`*steals ${user}'s beer and drinks it down!*`);
        messageList.push(`*buys ${user} a beer for being so awesome.*`);
        messageList.push(`*buys a round of beer for the entire channel with ${user}'s credit card*`);
    }

    return messageList.random();
}

module.exports = {
    action: action,
    help: help
};