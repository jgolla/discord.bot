var auth = require('./auth.json');
var commands = require('./commands.json');

var Discord = require('discord.js');

var mybot = new Discord.Client();

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
        }
    }
});

//when the bot is ready
mybot.on("ready", () => {
	console.log(`Ready to begin! Serving in ${mybot.channels.length} channels`);
});

function activeUsers() {
    let activeUsers = mybot.users.filter(user => user.status === 'online').map(user => user.username);
    return activeUsers.join(', ');
}

function parseMessage(message) {

    message = message.toLowerCase();

    let splitMessage = message.split(' ');
    if(splitMessage.length > 1) {
        let command = splitMessage[0];
        let userName = splitMessage.slice(1).join(' ');

        let foundUser = mybot.users.filter(user => user.username.toLowerCase() === userName || user.mention() === userName);
        if(foundUser.length === 1) {
            userName = foundUser[0].mention();
        }

        return { command: command, user: userName };
    } else {
        return { command: message };
    }
}

mybot.loginWithToken(auth.token);