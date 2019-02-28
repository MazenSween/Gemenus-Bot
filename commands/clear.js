const Discord = require("discord.js");
const errors = require("../utils/errors.js");

module.exports.run = async (bot, message, args) => {

    let prune = args[0];

    if(isNaN(prune)) {
    return message.channel.send("Must be a number!");
    }

    if(!message.member.hasPermission("MANAGE_MESSAGES")) { 
return message.reply("You have Insufficient Permission to perform this task");
}

    if(!prune) {
return message.channel.send("Usage -clear amount");
}

     if(prune < 0 || prune > 100) {
     return message.channel.send("1-100 messages only!");
     }

     if(prune > 0 || prune < 100) { 
return message.channel.bulkDelete(prune).then(() => {
      message.channel.send(`Cleared ${args[0]} Messages`).then(msg => msg.delete(5000));
    });
}

}
module.exports.help = {
  name: "-clear"
}