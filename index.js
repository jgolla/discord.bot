"use strict";

let auth = require('./auth.json');
let parseMessage = require('./messageparser.js');

let Discord = require('discord.js');
let bot = new Discord.Client();

let botAdminRole;
let generalCommands = require('./plugins.js')('plugins');
let adminCommands = require('./plugins.js')('adminplugins');


let Datastore = require('nedb'), 
    db = new Datastore({ filename: 'discord.db', autoload: true });

let needIdList = [];

bot.on('message', function(message) {

    // don't respond to yourself
    if(message.author === bot.user) {
        return;
    }

    let parsedMessage = parseMessage(message.content);
    if(parsedMessage) {
        if(generalCommands[parsedMessage.command]) {

            let pluginParameters = {
                bot: bot,
                message: message,
                body: parsedMessage.body,
                plugins: generalCommands,
                db: db
            };

            generalCommands[parsedMessage.command](pluginParameters);
        } else if (isUserBotAdmin(message.author) && adminCommands[parsedMessage.command]) {

            let pluginParameters = {
                bot: bot,
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
bot.on('ready', () => {
    console.log(`Ready to begin! Serving in ${bot.channels.length} channels`);
    
    // patch bot with utility find user function
    bot.findUser = (name) => bot.users.filter(user => user.username.toLowerCase() === name.toLowerCase() || user.mention() === name)[0];

    lookForNewUsers();

    // set bot admin role
    botAdminRole = bot.servers[0].roles.get('name', 'botadmin');
});

bot.on('presence', (oldUser, newUser) => {

    // get the users entry in the db.
    db.find({ nick: newUser.mention() }, (err, docs) => {
        if(docs.length === 1) {
            updateUserStatus(docs[0]);
        }
    });

    function updateUserStatus(entry) {
        if(newUser.status === "online") {
            entry.lastSeen = "now";
        } else if(newUser.status !== "online") {
            entry.lastSeen = Date().toString();
        }

        db.update({ nick: entry.nick }, entry, (err, num) => console.log(err + ' ' + num));
    }
});

function lookForNewUsers() {
    bot.users.forEach((user) => {
        if(user !== bot.user && user.name !== 'Lord of Darkness') {
            let entry = db.find({ nick: user.mention() }, (err, docs) => {
                if(docs.length === 0) {
                    bot.sendMessage(user, 'Please send me your nation id.');
                    needIdList.push(user.mention());
                }
            });
        }
    });
}

function isUserBotAdmin(author) {
    return author.hasRole(botAdminRole);
}

bot.loginWithToken(auth.token);