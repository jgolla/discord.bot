"use strict";

var auth = require('./auth.json');
var commands = require('./commands.json');
var parseMessage = require('./messageparser.js');
var adminActions = require('./adminactions.js');

var Discord = require('discord.js');
var mybot = new Discord.Client();

mybot.on('message', function(message) {

    // don't respond to yourself
    if(message.author === mybot.user) {
        return;
    }

    let parsedMessage = parseMessage(message.content);

    if(commands[parsedMessage.command]) {
        let userName;
        if(parsedMessage.body) {
            let user = mybot.findUser(parsedMessage.body);
            if(user) {
                userName = user.mention();
            } else {
                userName = parsedMessage.body;
            }

            let messageToSend = commands[parsedMessage.command].replace('{USER_NAME}', userName);
            mybot.sendMessage(message.channel, messageToSend);
        }
    } else {
        adminActions(mybot, parsedMessage, message);
    }
});

// when the bot is ready
mybot.on('ready', () => {
    console.log(`Ready to begin! Serving in ${mybot.channels.length} channels`);
    //botAdminRole = getServer().roles.get('name', 'botadmin');

    mybot.findUser = (name) => mybot.users.filter(user => user.username.toLowerCase() === name.toLowerCase() || user.mention() === name)[0];

});

mybot.loginWithToken(auth.token);