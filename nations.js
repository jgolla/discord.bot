"use strict";

let fs = require('fs');
let nationList;

function parseFile() {
    let lines = fs.readFileSync(__dirname + '/CyberNations_SE_Nation_Stats.txt').toString().split('\n');

    let properties = lines[0].split('|');
    // remove /r from the end
    properties.pop();

    lines = lines.slice(1);

    nationList = [];
    lines.forEach(function(item) {
        if(item) {
            let splitLine = item.split('|');
            let nation = new Nation();
            for(let i = 0; i < properties.length; i++) {
                nation[properties[i]] = splitLine[i];
            }

            nationList.push(nation);
        }
    });
}

function Nation() {};
Nation.prototype.getCNLink = function() {
    return 'http://www.cybernations.net/nation_drill_display.asp?Nation_ID=' + this['Nation ID'];
};

module.exports = (function(){
    if(!nationList) {
        parseFile();
    }

    return nationList;
}());