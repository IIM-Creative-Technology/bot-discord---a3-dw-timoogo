const Discord = require('discord.js');

/**
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {Array<String>} arguments
 */
module.exports.run = async (client, message, arguments) => {
  const embed = new Discord.MessageEmbed();

  const cmds = ["rm",
                "getxp",
              "wlc"]
  const descriptions = ["this command will remove x elements from a channel  \n ``` [COMMAND_PREFIX]rm [amount]``` \n example: ```!rm 50```",
                        "this command will remove your command message, wait 5secondes, then it will show you your current level and xp",
                        "simple welcome embed message, it will remove the command prompt, then show you the embed explanation"]
                        if (!arguments[0]) return message.reply(`please specify which command you want, \n ${cmds}`)

                        if(arguments[0] != null){

  if(arguments[0] == cmds[0]){
      embed.setTitle(' command'+ arguments[0]).setDescription(descriptions[0]);
  }
  if(arguments[0] == cmds[1]){
    embed.setTitle('help section '+ arguments[0]).setDescription(descriptions[1]);
  }

 
  }
  if(!cmds.includes(arguments[0])){
    message.delete()
    return message.channel.send("sorry, command `" +message.content + "` not available yet. Please contact a boss")
  }
  ///TODO 
  // Je voulais faire une boucle pour chaque commandes dans `cmd` afficher son titre et sa description
  // else {
  //   cmds.forEach(element =>     embed.setTitle('help section '+ arguments[0]).setDescription(descriptions[1]););

  // }
  message.channel.send({
    embeds: [ embed ]
  })
};

module.exports.name = 'help';