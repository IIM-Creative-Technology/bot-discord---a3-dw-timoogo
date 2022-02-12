const Discord = require('discord.js');
const { sleep } = require('../src/utilities');

/**
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {Array<String>} arguments
 */
module.exports.run = async (client, message, arguments) => {
    //console.log(message.channelId)
    if(message.member.roles.cache.some(r => r.name === "hollow")) {
      sleep(4000).then(
        message.reply("you can't do this action without permission, please contact a boss member"),
        message.delete()
      )
      return 
  } else {
    if(!arguments[0]) return message.reply('need args')
    if(isNaN(arguments[0])) return message.reply('need number')
    if(arguments[0] >= 100)return message.reply('too many number')
    if(arguments[0] <= 1)return message.reply('not enought number')
    
    // await message.channel.bulkDekete(arguments[0]) 
   await message.channel.messages.fetch({limit:arguments[0]}).then(messages =>{
     try{
        message.channel.bulkDelete(messages)
         if(arguments[1] === "verb") {
           sleep(1000).then(
             message.reply(`I've cleaned ${arguments[0]} messages`)
            )
         }
     } catch(e){
        message.reply(`Not enough messages to remove`)
        console.log(e)


     }
   })
}
}


module.exports.name = 'rm';