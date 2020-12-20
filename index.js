const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();
const fs = require("fs");
const { exit } = require("process");
const prefix = "";
const songprefix = "#";

const ytdl = require("ytdl-core");

const {month,formatTime,computeTime} = require("./build/datetime.js");
const {execute,skip,stop} = require("./build/streamer.js");

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
    let wish=1;
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

        if (message.content.toLowerCase().includes("name")){
            const embed = new Discord.MessageEmbed()
            .setTitle('Edith Jr')
            .setColor(0xff0000)
            .setDescription('But call me Edith! not junior');
            message.channel.send(embed);
        }

        //sending attachments
        
        if(message.content.toLowerCase().includes("guidelines")){
            const buffer = fs.readFileSync('./guidelines.txt');
            try{
            const attachment = new Discord.MessageAttachment(buffer, 'guidelines');
            message.channel.send(`${message.author}, here are the guidelines!`, attachment);
            }
            catch(err){
                console.log("error");
            }
        }

        if(message.content.toLowerCase().includes("time") || 
            message.content.toLowerCase().includes("date")){
                const date = new Date().getDate();
                const mon = new Date().getMonth();
                const year = new Date().getFullYear();
                const hrs = new Date().getHours();
                const mints = new Date().getMinutes();
                message.channel.send(`It's ${date} ${month(mon+1)},${year}, ${formatTime(hrs,mints)}`);
        }

        if(message.content.toLowerCase().includes("bye")){
                wish=0;
                message.reply(`${computeTime(wish)}`);
                if(wish===0)
                    return;
        }

        const serverQueue = queue.get(message.guild.id);

        if (message.content.startsWith(`${songprefix}play`)) {
            execute(message, serverQueue);
            return;
        } else if (message.content.startsWith(`${songprefix}skip`)) {
            skip(message, serverQueue);
            return;
        } else if (message.content.startsWith(`${songprefix}stop`)) {
            stop(message, serverQueue);
            return;
        } else {
            message.channel.send("You need to enter a valid command!");
        }
        
    }
    catch(err){
        console.log(err);
    }
                
});            

client.login(config.BOT_TOKEN);