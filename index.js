var auth = require('./auth.json');
var commands = require('./commands.json');

var Discord = require('discord.js');
var mybot = new Discord.Client();

var botAdminRole;

mybot.on('message', function(message) {

    // don't respond to yourself
    if(message.author === mybot.user) {
        return;
    }

    let parsedMessage = parseMessage(message.content);

    if(commands[parsedMessage.command]) {
        let messageToSend = commands[parsedMessage.command].replace('{USER_NAME}', parsedMessage.user);
        mybot.sendMessage(message.channel, messageToSend);
    } else {
        switch(parsedMessage.command) {
            case '!active':
                mybot.sendMessage(message.channel, activeUsers());
            break;
            case '!refreshcmds':
                let isPM = message.channel instanceof Discord.PMChannel;
                if(isPM) {
                    delete require.cache[require.resolve('./commands.json')];
                    commands = require('./commands.json');
                }
            break;
            case '!eval':
                if (message.author.hasRole(botAdminRole)) {
                    // this is bad to do!
                    let output = eval(parsedMessage.user);
                    mybot.sendMessage(message.channel, output);
                }
            break;
            case '!createrole':
                if (message.author.hasRole(botAdminRole)) {
                    let server = getServer();
                    var role = server.roles.get('name', parsedMessage.user);
                    if(!role) {
                        mybot.createRole(server, {
                            name: parsedMessage.user		
                        }).then(createdRole => {
				            role = createdRole;
			            }).catch(console.log);
                    } else {
                        mybot.sendMessage(message.channel, `${parsedMessage.user} already exists`)
                    }
                }
            break;
            case '!addtorole':
                if (message.author.hasRole(botAdminRole)) {
                    let params = parsedMessage.user.split(':');
                    let server = getServer();
                    var role = server.roles.get('name', params[0]);
                    let user = findUser(params[1])[0];
                    mybot.addMemberToRole(user, role, (err) => console.log(err));
                }
            break;
        }
    }
});

// when the bot is ready
mybot.on('ready', () => {
    console.log(`Ready to begin! Serving in ${mybot.channels.length} channels`);
    botAdminRole = getServer().roles.get('name', 'botadmin');
});

function activeUsers() {
    let activeUsers = mybot.users.filter(user => user.status === 'online').map(user => user.username);
    return activeUsers.join(', ');
}

function getServer() {
    return mybot.servers[0];
}

function findUser(name) {
    return mybot.users.filter(user => user.username.toLowerCase() === name || user.mention() === name);
}

function parseMessage(message) {

    message = message.toLowerCase();

    let splitMessage = message.split(' ');
    if(splitMessage.length > 1) {
        let command = splitMessage[0];
        let userName = splitMessage.slice(1).join(' ');

        let foundUser = findUser(userName);
        if(foundUser.length === 1) {
            userName = foundUser[0].mention();
        }

        return { command: command, user: userName };
    } else {
        return { command: message };
    }
}

mybot.loginWithToken(auth.token);