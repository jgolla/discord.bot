'use strict';

require('./utils.js');

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

    if(message.channel.isPrivate && needIdList.indexOf(message.author.toString()) !== -1) {
        db.insert({nick: message.author.toString(), nationid: message.content});
        needIdList.splice(needIdList.indexOf(message.author.toString()), 1);
    }
});

// when the bot is ready
bot.on('ready', () => {
    console.log(`Ready to begin!`);

    lookForNewUsers();

    // set bot admin role
    botAdminRole = bot.guilds.first().roles.find('name', 'botadmin');
});

bot.on('presenceUpdate', (oldUser, newUser) => {

    // get the users entry in the db.
    db.find({ nick: newUser.toString() }, (err, docs) => {
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
        if(user !== bot.user) {
            let entry = db.find({ nick: user.toString() }, (err, docs) => {
                if(docs.length === 0) {
                    bot.sendMessage(user, 'Please send me your nation id.');
                    needIdList.push(user.toString());
                }
            });
        }
    });
}

function isUserBotAdmin(author) {
    let member = bot.guilds.first().members.find('id', author.id);
    let role = member.roles.find('name', botAdminRole.name);
    return !!role;
}

bot.login(auth.token);