const Discord = require('discord.js');

/**
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {Array<String>} arguments
 */
module.exports.run = async (client, message, arguments) => {
  const cmds = []
  const embed = new Discord.MessageEmbed();
  if(arguments[0] == "rm"){
      embed.setTitle('command'+ arguments[0]).setDescription('this command will remove x elements from a channel  \n ``` !rm [amount] [isVerbose]```');
  }
  if(arguments[0] == ""){
    embed.setTitle('help section '+ arguments[0]).setDescription('this command will explain the available commands');
}

  message.channel.send({
    embeds: [ embed ]
  })
};

module.exports.name = 'help';