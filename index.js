"use strict";

var auth = require('./auth.json');
var parseMessage = require('./messageparser.js');

var Discord = require('discord.js');
var mybot = new Discord.Client();

var admin = require('./adminactions.js');
var adminActions;

var pluggins = require('./pluggins.js')();

mybot.on('message', function(message) {

    // don't respond to yourself
    if(message.author === mybot.user) {
        return;
    }

    let parsedMessage = parseMessage(message.content);

    if(pluggins[parsedMessage.command]) {

        let plugginParameters = {
            bot: mybot,
            channel: message.channel,
            user: parsedMessage.body,
            pluggins: pluggins
        };

        pluggins[parsedMessage.command](plugginParameters);
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