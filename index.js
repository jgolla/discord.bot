"use strict";

var auth = require('./auth.json');
var parseMessage = require('./messageparser.js');

var Discord = require('discord.js');
var mybot = new Discord.Client();

var admin = require('./adminactions.js');
var adminActions;

var generalCommands = require('./plugins.js')('plugins');

mybot.on('message', function(message) {

    // don't respond to yourself
    if(message.author === mybot.user) {
        return;
    }

    let parsedMessage = parseMessage(message.content);

    if(generalCommands[parsedMessage.command]) {

        let pluginParameters = {
            bot: mybot,
            channel: message.channel,
            user: parsedMessage.body,
            plugins: generalCommands
        };

        generalCommands[parsedMessage.command](pluginParameters);
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