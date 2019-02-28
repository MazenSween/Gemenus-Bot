const Discord = require("discord.js")
module.exports.run = async(bot, message, args) => {

    let helpEmbed = new Discord.RichEmbed()
    .setDescription("Command Categories")
    .setColor("#f49542")
    .addField("-helpmod", "For full moderation help!")
    .addField("-report", "Command")
    .addField("-serverinfo", "Command.")
    .addField("-botinfo", "Command.")
    .addField("-Music(soon)", "Command.")
    .setFooter("To Report A User (-report @mention reason!).")
    message.channel.send(helpEmbed);
    return;
}
module.exports.help = {
    name: "-help"
}