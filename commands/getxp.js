const Discord = require('discord.js');
const  mySQL = require('mysql');
require('dotenv').config()
const connexion = mySQL.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
})
/**
 * @param {Discord.Client} client
 * @param {Discord.Message} message
 * @param {Array<String>} arguments
 */
module.exports.run = async (client, message, arguments) => {

connexion.connect((err) => console.log(err ?  err : "db connected"))


connexion.query(`SELECT xp_count, level from xp WHERE user_id = '${message.author.id}' `, (err, res) =>{
  console.log(res)
  const embed = new Discord.MessageEmbed();
  embed.setTitle(`XP of ${message.author.username}`).setDescription(`Your current level is ${res[0].level} with ${res[0].xp_count} xp`);

  setTimeout(()=>{
    message.channel.bulkDelete(1)
    message.channel.send({
      embeds: [ embed ]
    })
  },5000)


})


};

module.exports.name = 'getxp';