"use strict";

function parseMessage(message) {
    if(message.startsWith('!')) {
        // remove the !
        message = message.slice(1);

        let splitMessage = message.split(' ');
        if(splitMessage.length > 1) {
            let command = splitMessage[0].toLowerCase();
            let body = splitMessage.slice(1).join(' ');
            return { command: command, body: body };
        } else {
            return { command: message.toLowerCase() };
        }
    }
}

module.exports = parseMessage;