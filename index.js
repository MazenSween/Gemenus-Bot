const botconfig = require("./botconfig.json");
const tokenfile = require("./token.json");
const Discord = require("discord.js");
const moment = require("moment");
const mysql = require('mysql');
const fs = require("fs");
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
let coins = require("mysql");
let xp = require("mysql");
let purple = botconfig.purple;
let cooldown = new Set();
let cdseconds = 5;

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  
  });
});

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'mazen@2005',
  database : 'daeshan'
});

connection.connect(err => {
  // Rethrow non-MySQL errors
  console.log("Connected to database!");
});
 
connection.end();

bot.on("ready", async () => {

  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
  bot.user.setActivity("Gemenus | -help", {type: "PLAYING"});

});

bot.on('guildMemberAdd', member => {
  let channel = member.guild.channels.find('name', 'join-leave');
  let memberavatar = member.user.avatarURL
      if (!channel) return;
      let embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setThumbnail(memberavatar)
      .addField('Welcome!', `Welcome to the Official Gemenus Company Discord server!, please read <#498593438393040958>.`)
      .addField('Your are the member number:', `${member.guild.memberCount}`)
      .addField("Name", `<@` + `${member.id}` + `>`, true)
      .addField('Server:', `${member.guild.name}`, true)
      .setFooter(`"${member.guild.name}"`)
      .setTimestamp()

      channel.sendEmbed(embed);
});

bot.on('guildMemberAdd', member => {

  console.log(`${member}`, "has joined" + `${member.guild.name}`)

});

bot.on('guildMemberRemove', member => {
  let channel = member.guild.channels.find('name', 'join-leave');
  let memberavatar = member.user.avatarURL
      if (!channel) return;
      let embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setThumbnail(memberavatar)
      .addField('Name:', `${member}`)
      .addField('Has Let the Server', 'See you latter')
      .addField('The server now is.', `${member.guild.memberCount}` + " members")
      .setFooter(`**${member.guild.name}`)
      .setTimestamp()

      channel.sendEmbed(embed);
});

bot.on('guildMemberRemove', member => {
  console.log(`${member}` + "has left" + `${member.guild.name}` + "Sending leave message now")
  console.log("Leave Message Sent")
});

bot.on("message", async message => {

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  if(!coins[message.author.id]){
    coins[message.author.id] = {
      coins: 0
    };
  }

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

  setTimeout(() => {
    cooldown.delete(message.author.id)
  }, cdseconds * 5000)

  // if(cmd === `${prefix}kick`){
  //
  //   //!kick @daeshan askin for it
  //
  //   let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  //   if(!kUser) return message.channel.send("Can't find user!");
  //   let kReason = args.join(" ").slice(22);
  //   if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!");
  //   if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");
  //
  //   let kickEmbed = new Discord.RichEmbed()
  //   .setDescription("~Kick~")
  //   .setColor("#e56b00")
  //   .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
  //   .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
  //   .addField("Kicked In", message.channel)
  //   .addField("Tiime", message.createdAt)
  //   .addField("Reason", kReason);
  //
  //   let kickChannel = message.guild.channels.find(`name`, "report-a-user");
  //   if(!kickChannel) return message.channel.send("Can't find incidents channel.");
  //
  //   message.guild.member(kUser).kick(kReason);
  //   kickChannel.send(kickEmbed);
  //
  //   return;
  // }
  //
  // if(cmd === `${prefix}ban`){
  //
  //   let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  //   if(!bUser) return message.channel.send("Can't find user!");
  //   let bReason = args.join(" ").slice(22);
  //   if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("No can do pal!");
  //   if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");
  //
  //   let banEmbed = new Discord.RichEmbed()
  //   .setDescription("~Ban~")
  //   .setColor("#bc0000")
  //   .addField("Banned User", `${bUser} with ID ${bUser.id}`)
  //   .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
  //   .addField("Banned In", message.channel)
  //   .addField("Time", message.createdAt)
  //   .addField("Reason", bReason);
  //
  //   let incidentchannel = message.guild.channels.find(`name`, "report-a-user");
  //   if(!incidentchannel) return message.channel.send("Can't find incidents channel.");
  //
  //   message.guild.member(bUser).ban(bReason);
  //   incidentchannel.send(banEmbed);
  //
  //
  //   return;
  // }
  //
  //
  // if(cmd === `${prefix}report`){
  //
  //   //!report @ned this is the reason
  //
  //   let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  //   if(!rUser) return message.channel.send("Couldn't find user.");
  //   let rreason = args.join(" ").slice(22);
  //
  //   let reportEmbed = new Discord.RichEmbed()
  //   .setDescription("Reports")
  //   .setColor("#15f153")
  //   .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
  //   .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
  //   .addField("Channel", message.channel)
  //   .addField("Time", message.createdAt)
  //   .addField("Reason", rreason);
  //
  //   let reportschannel = message.guild.channels.find(`name`, "report-a-user");
  //   if(!reportschannel) return message.channel.send("Couldn't find reports channel.");
  //
  //
  //   message.delete().catch(O_o=>{});
  //   reportschannel.send(reportEmbed);
  //
  //   return;
  // }
  //
  //
  //
  //
  // if(cmd === `${prefix}serverinfo`){
  //
  //   let sicon = message.guild.iconURL;
  //   let serverembed = new Discord.RichEmbed()
  //   .setDescription("Server Information")
  //   .setColor("#15f153")
  //   .setThumbnail(sicon)
  //   .addField("Server Name", message.guild.name)
  //   .addField("Created On", message.guild.createdAt)
  //   .addField("You Joined", message.member.joinedAt)
  //   .addField("Total Members", message.guild.memberCount);
  //
  //   return message.channel.send(serverembed);
  // }
  //
  //
  //
  // if(cmd === `${prefix}botinfo`){
  //
  //   let bicon = bot.user.displayAvatarURL;
  //   let botembed = new Discord.RichEmbed()
  //   .setDescription("Bot Information")
  //   .setColor("#15f153")
  //   .setThumbnail(bicon)
  //   .addField("Bot Name", bot.user.username)
  //   .addField("Created On", bot.user.createdAt);
  //
  //   return message.channel.send(botembed);
  // }

});

bot.login(tokenfile.token);
