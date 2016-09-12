'use strict';

let needIdList = [];

function init(pluginParameters) {
    setupPresenceUpdate(pluginParameters);
}

function setupPresenceUpdate(pluginParameters) {
    pluginParameters.bot.on('presenceUpdate', (oldUser, newUser) => {

        // get the users entry in the db.
        pluginParameters.db.find({ nick: newUser.toString() }, (err, docs) => {
            if(docs.length === 1) {
                if(newUser.status === 'online') {
                    docs[0].lastSeen = 'now';
                } else if(newUser.status !== 'online') {
                    docs[0].lastSeen = Date().toString();
                }

                pluginParameters.db.update({ nick: docs[0].nick }, docs[0], (err, num) => err && console.log(err + ' ' + num));
            } else if(docs.length === 0) {
                if(newUser.status === 'online') {
                    newUser.sendMessage('Please send me your nation id.');    
                    needIdList.push(newUser.toString());
                }
            }
        });
    });

    pluginParameters.bot.on('message', (message) => {
        if(message.channel.type === 'dm' && needIdList.indexOf(message.author.toString()) !== -1) {
            if(Number.isInteger(message.content)) {
                pluginParameters.db.insert({ nick: message.author.toString(), nationid: message.content, lastSeen: 'now' });
                needIdList.splice(needIdList.indexOf(message.author.toString()), 1);
            } else {
                message.author.sendMessage('Then I will just keep asking you!\nPlease send me your nation id.');
            }
        }
    });
}

module.exports = {
    init: init
};