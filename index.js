const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();
const fs = require("fs");
const prefix = "";

client.on("ready", () => {
    console.log("I am Here!");
});

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
    // Send the message to a designated channel on a server:
    const channel = member.guild.channels.cache.find(ch => ch.name === 'general');
    if (!channel) return;
    // Send the message, mentioning the member
    channel.send(`Welcome to the server, ${member}`);
  });

client.on("message", function(message) { 
    if (message.author.bot) return;      //ignoring bot questions as of now
    if (!message.content.startsWith(prefix)){
        //return error for all except for ! and #
        return;
    }  
    
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
    try{
        if (command === "hi") {
            message.reply(`Hello World! I'm Edith :smiley:`);   
        }

        if (message.content === 'what is your name?') {
            const embed = new Discord.MessageEmbed()
            .setTitle('Edith Jr')
            .setColor(0xff0000)
            .setDescription('But call me Edith! not junior');
            message.channel.send(embed);
        }

        //sending attachments
        
            if(message.content.includes("guidelines")){
                const buffer = fs.readFileSync('./guidelines.txt');
                try{
                const attachment = new Discord.MessageAttachment(buffer, 'guidelines');
                message.channel.send(`${message.author}, here are the guidelines!`, attachment);
                }
                catch(err){
                    console.log("error");
                }
            }
    }
    catch(err){
        console.log("error string");
    }
                
});            

client.login(config.BOT_TOKEN);