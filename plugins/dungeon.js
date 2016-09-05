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
        messageList.push(`What? You gonna lock yourself down there?`);
        messageList.push(`I'm not going there, ${sender}, you do it!`);
        messageList.push(`Who did you say want me to take there?`);
        messageList.push(`Do you know the bankers turned that into a rave club?`);
        messageList.push(`That's kinky, ${sender}, let's do it!`);
        messageList.push(`I'm going to lock you down there, ${sender}, if you don't leave me alone!`);

        messageList.push(`*stares at ${sender} in disbelief...*`);
        messageList.push(`*wonders who ${sender} wants thrown in there...*`);
        messageList.push(`*punishes ${sender} with a one way trip to the Dungeon...*`);
        messageList.push(`*assigns ${sender} to the Dungeon Cleaning Team.*`);
        messageList.push(`*doesn't thinks you know how to use that command, ${sender}!*`);
        messageList.push(`*chains ${sender} in the Dungeon.*`);
        messageList.push(`*locks up ${sender} in the Dungeon's dirty.*`);
        messageList.push(`*throws ${sender} into the Dungeon's shaft!*`);
    } else {
        messageList.push(`Are you really going to send ${user} to the Dungeon for that?`);
        messageList.push(`I'm sorry, but ${user} has been banned from Dungeon enjoyment!`);
        messageList.push(`Throw ${user} into the Dungeon? But I cleaned it earlier...`);
        messageList.push(`Sorry, the Dungeon is closed for maintenance right now! ${user} is free to go...`);
        messageList.push(`By Imperial Decree of Secret Emperor Orionbot, ${user} is hereby condemned to the Dungeon!`);
        messageList.push(`${user} has been in there all morning, ${sender}. He will never leave!`);
        messageList.push(`I saw ${sender} locking up ${user} into the Dungeon!`);
        messageList.push(`The Dungeon? No... ${user} will be locked up in Frawley's Coins Room to clean them polish them all!`);
        messageList.push(`${user} will be placed in laundry service in the Dungeon as per your request, ${sender}.`);
        messageList.push(`${user} will never leave the Dungeon... Mwahahahaha!`);

        messageList.push(`*chains ${user} to Letum's Privy.*`);
        messageList.push(`*throws ${user} into Letum's Dungeon.*`);
        messageList.push(`*throws ${user} into Frawley's Coin Cleaning room.*`);
        messageList.push(`*throws ${user} into diplo's paper filling cabinet.*`);
        messageList.push(`*throws ${user} into Francograd's Deepest Dungeon.*`);
        messageList.push(`*books a double suite for ${user} and ${sender} in the Dungeon's VIP Rooms.*`);
        messageList.push(`*and ${user} go into the Dungeon and put on a party!*`);
        messageList.push(`*can't find the keys to the Dungeon... ${user} will be chained to the entrance meanwhile!*`);
    }

    return messageList.random();
}