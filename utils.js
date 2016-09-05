'use strict';

if(!Array.prototype.random) {
    Array.prototype.random = function() {
        return this[Math.floor(Math.random() * this.length)];
    }
}

module.exports = {
    getMentionFromName : function(username, bot) {
        let foundUser = '';
       
        if(username) {
            foundUser = bot.users.find('username', username);
            if(foundUser) {
                foundUser = foundUser.toString();
            } else {
                foundUser = username;
            }
        }

        return foundUser;
    }
};