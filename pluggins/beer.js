"use strict";

module.exports = function(plugginParameters) {
    let foundUser = plugginParameters.bot.findUser(plugginParameters.user);
    if(foundUser) {
        foundUser = foundUser.mention();
    } else {
        foundUser = plugginParameters.user;
    }

    plugginParameters.bot.sendMessage(plugginParameters.channel, `:beer: ... have a beer, ${foundUser}`);
};