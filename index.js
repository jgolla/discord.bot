"use strict";

let auth = require('./auth.json');
let parseMessage = require('./messageparser.js');

let Discord = require('discord.js');
let mybot = new Discord.Client();

let botAdminRole;
let generalCommands = require('./plugins.js')('plugins');
let adminCommands = require('./plugins.js')('adminplugins');


let Datastore = require('nedb'), 
    db = new Datastore({ filename: 'discord.db', autoload: true });

let needIdList = [];

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
                plugins: generalCommands,
                db: db
            };

            generalCommands[parsedMessage.command](pluginParameters);
        } else if (isUserBotAdmin(message.author) && adminCommands[parsedMessage.command]) {

            let pluginParameters = {
                bot: mybot,
                message: message,
                body: parsedMessage.body,
                plugins: adminCommands,
                db: db
            };
            
            adminCommands[parsedMessage.command](pluginParameters);
        }
    }

    if(message.channel.isPrivate && needIdList.indexOf(message.author.mention()) !== -1) {
        db.insert({nick: message.author.mention(), nationid: message.content});
        needIdList.splice(needIdList.indexOf(message.author.mention()), 1);
    }
});

// when the bot is ready
mybot.on('ready', () => {
    console.log(`Ready to begin! Serving in ${mybot.channels.length} channels`);
    
    // patch bot with utility find user function
    mybot.findUser = (name) => mybot.users.filter(user => user.username.toLowerCase() === name.toLowerCase() || user.mention() === name)[0];

    lookForNewUsers();

    // set bot admin role
    botAdminRole = mybot.servers[0].roles.get('name', 'botadmin');
});

function lookForNewUsers() {
    mybot.users.forEach((user) => {
        if(user !== mybot.user) {
            let entry = db.find({ nick: user.mention() }, (err, docs) => {
                if(docs.length === 0) {
                    mybot.sendMessage(user, 'Please send me your nation id.');
                    needIdList.push(user.mention());
                }
            });
        }
    });
}

function isUserBotAdmin(author) {
    return author.hasRole(botAdminRole);
}

mybot.loginWithToken(auth.token);