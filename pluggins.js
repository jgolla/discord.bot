"use strict";

let fs = require('fs');

function pluggins() {

    let plugginList = { };

    let files = fs.readdirSync('./pluggins');
    files.forEach((file) => {
        let command = file.substr(0, file.length - 3);
        plugginList[command] = require(__dirname + '/pluggins/' + file);
    });

    return plugginList;
}

module.exports = pluggins