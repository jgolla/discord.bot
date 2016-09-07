'use strict';

let utils = require('../utils.js');

module.exports = function(pluginParameters) {

    if(!pluginParameters.body) {
        pluginParameters.message.channel.sendMessage('Usage: !rps <rock|paper|scissors>');
        return;
    }

    let player = pluginParameters.body.toLowerCase();
    let computer = choices.random();

    pluginParameters.message.channel.sendMessage(`I choose ${computer}`).then(() => {
        let winner = compare(player, computer);
        let message = '';
        if(winner === player) {
            message = PlayerWins.random();
        } else if(winner === computer) {
            message = ComputerWins.random();
        } else if(winner === 'tie') {
            message = Tie.random();
        } else {
            message = 'You have to pick one of the options.'
        }

        pluginParameters.message.channel.sendMessage(message);
    });
};

const PlayerWins = ['You have bested a bot, I bet you feel special.', 'You have won, dummy.'];
const ComputerWins = ['I WIN, YOU LOSE.', 'HAHAHAH, loser!'];
const Tie = ['It was a tie.'];

// http://stackoverflow.com/a/17977555/464627
let choices = ['rock', 'paper', 'scissors'];
let map = {};

choices.forEach(function(choice, i) {
    map[choice] = {};
    map[choice][choice] = 'tie';
    map[choice][choices[(i+1)%3]] = choices[(i+1)%3];
    map[choice][choices[(i+2)%3]] = choice;
})

function compare(choice1, choice2) {
    return (map[choice1] || {})[choice2] || 'Invalid choice';
}