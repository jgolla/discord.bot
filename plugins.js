"use strict";

let fs = require('fs');

function plugins(path) {

    let pluginList = { };

    let files = fs.readdirSync('./' + path);
    files.forEach((file) => {
        let command = file.substr(0, file.length - 3);
        pluginList[command] = require(__dirname + '/' + path + '/' + file);
    });

    return pluginList;
}

module.exports = plugins