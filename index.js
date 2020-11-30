const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();
const fs = require("fs");
const prefix = "";

client.on("ready", () => {
    console.log("I am Here!");
});

client.on("message", function(message) { 
    if (message.author.bot) return;      
    if (!message.content.startsWith(prefix)){
        //return error for all except for ! and #
        return;
    }  
    
    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if (command === "hi") {
        message.reply(`Hello World! I'm Edith :smiley:`);   
    }

    //sending attachments
   /* try{
        if(command.contains("guidelines")){
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
    }*/
                    
});            

client.login(config.BOT_TOKEN);