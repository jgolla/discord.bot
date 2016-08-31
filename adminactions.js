"use strict";

function adminActions(bot, commandMessage, message) {

    if(!isUserBotAdmin(bot, message.author)){
        return;
    }

    switch(commandMessage.command) {
        case '!active': 
        {
            bot.sendMessage(message.channel, activeUsers());
        }
        break;
        case '!eval':
        {
            // this is bad to do!
            let output = eval(parsedMessage.body);
            mybot.sendMessage(message.channel, output);
        }
        break;
        case '!createrole':
        {
            let server = getServer(bot);
            let role = server.roles.get('name', commandMessage.body);
            if(!role) {
                bot.createRole(server, {
                    name: commandMessage.body		
                }).then(() =>  bot.sendMessage(message.channel, `Created role ${commandMessage.body} `));
            } else {
                bot.sendMessage(message.channel, `${commandMessage.body} already exists`);
            }
        }
        break;
        case '!deleterole':
        {
            let server = getServer(bot);
            let role = server.roles.get('name', commandMessage.body);
            if(role) {
                role.delete().then(() => bot.sendMessage(message.channel, `${commandMessage.body} deleted`));
            }
        }
        break;
        case '!addtorole':
        {
            let params = commandMessage.body.split(':');
            let server = getServer(bot);
            let role = server.roles.get('name', params[0]);
            if(role) {
                let user = bot.findUser(params[1]);
                bot.addMemberToRole(user, role, (err) => console.log(err)).then(() => bot.sendMessage(message.channel, `${params[1]} added to role ${params[0]}`));
            } else {
                bot.sendMessage(message.channel, `Could not find role ${params[0]}`)
            }
        }
        break;
        case '!removefromrole':
        {
            let params = commandMessage.body.split(':');
            let server = getServer(bot);
            let role = server.roles.get('name', params[0]);
            if(role) {
                let user = bot.findUser(params[1]);
                bot.removeMemberFromRole(user, role, (err) => console.log(err)).then(() => bot.sendMessage(message.channel, `${params[1]} removed from role ${params[0]}`));
            } else {
                bot.sendMessage(message.channel, `Could not find role ${params[0]}`)
            }
        }
    }
}

function getServer(bot) {
    return bot.servers[0];
}

function getBotAminRole(bot) {
    return getServer(bot).roles.get('name', 'botadmin');
}

function isPrivateMessage(channel) {
    return channel instanceof Discord.PMChannel;
}

function isUserBotAdmin(bot, author) {
    let botAdminRole = getBotAminRole(bot);
    return author.hasRole(botAdminRole);
}

function activeUsers(bot) {
    let activeUsers = bot.users.filter(user => user.status === 'online').map(user => user.username);
    return activeUsers.join(', ');
}

module.exports = adminActions;