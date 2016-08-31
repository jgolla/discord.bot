"use strict";

var auth = require('./auth.json');
var commands = require('./commands.json');
var parseMessage = require('./messageparser.js');

var Discord = require('discord.js');
var mybot = new Discord.Client();

var admin = require('./adminactions.js');
var adminActions;

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
    } else if(parsedMessage.command === '!help') {
        let helpList = 'Current commands: ';
        for(let prop in commands) {
            helpList += prop + ', ';
        }

         mybot.sendMessage(message.channel, helpList.substr(0, helpList.length - 2));
    } else {
        adminActions(parsedMessage, message);
    }
});

// when the bot is ready
mybot.on('ready', () => {
    console.log(`Ready to begin! Serving in ${mybot.channels.length} channels`);
    
    // patch bot with utility find user function
    mybot.findUser = (name) => mybot.users.filter(user => user.username.toLowerCase() === name.toLowerCase() || user.mention() === name)[0];
    
    // wait for the bot to be initialized before setting up the admin actions
    adminActions = admin(mybot);
});

mybot.loginWithToken(auth.token);