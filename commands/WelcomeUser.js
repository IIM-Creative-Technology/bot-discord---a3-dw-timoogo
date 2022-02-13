const Discord = require('discord.js');

/**
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {Array<String>} arguments
 */
module.exports.run = async (client, message,  arguments) => {
  const embed = new Discord.MessageEmbed();
  await message.delete().then(
    embed
    .setTitle(`Welcome to ${message.author.username} ` )
    .setDescription("Seems working ! Nice ! try `!help` now "));

  message.channel.send({
    embeds: [ embed ]
  })
  

};

module.exports.name = 'wlc';