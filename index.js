"use strict";

var auth = require('./auth.json');
var parseMessage = require('./messageparser.js');

var Discord = require('discord.js');
var mybot = new Discord.Client();

var botAdminRole;
var generalCommands = require('./plugins.js')('plugins');
var adminCommands = require('./plugins.js')('adminplugins');

mybot.on('message', function(message) {

    // don't respond to yourself
    if(message.author === mybot.user) {
        return;
    }

    let parsedMessage = parseMessage(message.content);
    if(parsedMessage) {
        if(generalCommands[parsedMessage.command]) {

            let pluginParameters = {
                bot: mybot,
                message: message,
                body: parsedMessage.body,
                plugins: generalCommands
            };

            generalCommands[parsedMessage.command](pluginParameters);
        } else if (isUserBotAdmin(message.author) && adminCommands[parsedMessage.command]) {

            let pluginParameters = {
                bot: mybot,
                message: message,
                body: parsedMessage.body,
                plugins: adminCommands
            };
            
            adminCommands[parsedMessage.command](pluginParameters);
        }
    }
});

// when the bot is ready
mybot.on('ready', () => {
    console.log(`Ready to begin! Serving in ${mybot.channels.length} channels`);
    
    // patch bot with utility find user function
    mybot.findUser = (name) => mybot.users.filter(user => user.username.toLowerCase() === name.toLowerCase() || user.mention() === name)[0];

    // set bot admin role
    botAdminRole = mybot.servers[0].roles.get('name', 'botadmin');
});

function isUserBotAdmin(author) {
    return author.hasRole(botAdminRole);
}

mybot.loginWithToken(auth.token);