const Discord = require("discord.js")
const client = new Discord.Client()

require('dotenv').config();
const TOKEN = process.env.TOKEN;

const prefix = "&";

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('message', message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  if (!message.member.roles.cache.some(r => r.name === "Staff" || r.name === "SkilledUsers")) {
    return message.channel.send(`You don't have permission to use that command, ${message.author}.`);
  }

  const args = message.content.slice(prefix.length).split(' ');
  const command = args.shift().toLowerCase();

	if (command === 'pin') {
    if (!args.length) {
      return message.channel.send(`You didn't provide any arguments, ${message.author}! Right click on the message you want to pin and click "Copy ID", and use that as the argument.`);
    }
    message.channel.messages.fetch(args[0])
      .then(msg => msg.pin());
    message.delete();
  }  else if (command === 'unpin') {
    if (!args.length) {
      return message.channel.send(`You didn't provide any arguments, ${message.author}! Right click on the message you want to pin and click "Copy ID", and use that as the argument.`);
    }
    message.channel.messages.fetch(args[0])
      .then(msg => msg.unpin());
    message.delete();
  }  
});

client.login(TOKEN);