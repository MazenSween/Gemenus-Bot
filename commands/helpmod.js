const Discord = require("discord.js")
module.exports.run = async(bot, message, args) => {

    let helpEmbed = new Discord.RichEmbed()
    .setDescription("Command Categories")
    .setColor("#f49542")
    .addField("-ban", "Command.")
    .addField("-kick", "Command.")
    .addField("-clear 1-100", "Command.")
    .addField("-say", "Command.")
    .addField("-addrole ", "Command.")
    .addField("-removerole ", "Command.")
    message.channel.send(helpEmbed);
    return;
}
module.exports.help = {
    name: "-helpmod"
}