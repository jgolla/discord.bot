'use strict';

let cluster = require('cluster');
let isDebugMode = process.argv[2] === 'debug';
let botIsReady = false;

if (!isDebugMode && cluster.isMaster) {
    var worker = cluster.fork().process;
    cluster.on('exit', (worker) => {
        botIsReady = false;
        console.log(`worker ${worker.process.pid} died. restart...`);
        cluster.fork();
    });
} else {
    start();
}

process.on('uncaughtException', (err) => {
    console.error((new Date).toUTCString() + ' uncaughtException:', err.message);
    console.error(err.stack);
    process.exit(1);
});

function start() {    
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
    // auto compact every 5 mins
    db.persistence.setAutocompactionInterval(300000);

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
                if(generalCommands[parsedMessage.command].action) {
                    generalCommands[parsedMessage.command].action(pluginParameters);
                }
            } else if (isUserBotAdmin(message.author) && adminCommands[parsedMessage.command]) {

                let pluginParameters = {
                    bot: bot,
                    message: message,
                    body: parsedMessage.body,
                    plugins: adminCommands,
                    db: db
                };
                if(adminCommands[parsedMessage.command].action) {
                    adminCommands[parsedMessage.command].action(pluginParameters);
                }
            }
        }
    });

    // when the bot is ready
    bot.on('ready', () => {
        console.log('Ready event fired');
        if(!botIsReady) {
            console.log('Initializing bot');

            // init plugs
            let pluginParameters = {
                bot: bot,
                db: db
            };

            initPlugins([generalCommands, adminCommands], pluginParameters);

            // set bot admin role
            botAdminRole = bot.guilds.first().roles.find('name', 'botadmin');

            botIsReady = true;
        }
    });

    function initPlugins(pluginList, pluginParameters) {
        pluginList.forEach((item) => {
            for (let prop in item) {
                if(item[prop].init) {
                    item[prop].init(pluginParameters);
                }
            } 
        });
    }

    function isUserBotAdmin(author) {
        let member = bot.guilds.first().members.find('id', author.id);
        let role = member.roles.find('name', botAdminRole.name);
        return !!role;
    }

    bot.login(auth.token);
}