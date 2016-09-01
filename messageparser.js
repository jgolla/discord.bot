"use strict";

function parseMessage(message) {
    // remove the !
    message = message.slice(1);

    let splitMessage = message.split(' ');
    if(splitMessage.length > 1) {
        let command = splitMessage[0];
        let body = splitMessage.slice(1).join(' ');
        return { command: command, body: body };
    } else {
        return { command: message };
    }
}

module.exports = parseMessage;