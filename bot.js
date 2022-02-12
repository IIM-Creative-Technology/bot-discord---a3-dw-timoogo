const clientLoader = require('./src/clientLoader');
const commandLoader = require('./src/commandLoader');

require('colors');

const  mySQL = require('mysql')
require('dotenv').config()
const connexion = mySQL.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
})
connexion.connect((err) => console.log(err ?  err : "db connected"))

const COMMAND_PREFIX = '!';
const SUPER_ADMINISTRATOR =process.env.SUPER_ADMINISTRATOR
let xp_inc = 4
clientLoader.createClient(['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'DIRECT_MESSAGES'])
  .then(async (client) => {
    commandLoader.load(client);

    client.on('guildMemberAdd', async (member) => {
        const role = "940638533612339261"
        member.roles.add(role)
          .then(()=>{
            console.log(`Role added: ${role} to ${member.displayName}`)
            connexion.query(`SELECT user_id FROM xp WHERE user_id = "${member.id}"`,(err, res)=>{
              if(res.length > 0){
                console.log(`${member.displayName} already in db`)
                return 
              } else {
                connexion.query(`INSERT INTO xp (user_id, xp_count, xp_level) VALUES("${member.id}", 0, 0)`,(err, res)=>{
                    console.log("Succusfully added")
                })
              }
            } )  
            
          });
    })
    client.on('guildMemberRemove', async (member) => {
        connexion.query(`SELECT user_id FROM xp WHERE user_id = "${member.id}"`,(err, res)=>{
            if(res.length > 0){
                connexion.query(`DELETE FROM xp  WHERE user_id ="${member.id}" `,(err, res)=>{
                console.log(`removed` )
                })  
            return 
            } else {
                console.log(err)
            }
          } )  
    })

    client.on('messageCreate', async (message) => {
      if(message.content.startsWith(COMMAND_PREFIX)){
        const xp_inc = 0
        
        return
      }
      if(message.author.id != SUPER_ADMINISTRATOR){
 
        connexion.query(`SELECT user_id, xp_count FROM xp WHERE user_id = "${message.author.id}"`,(err, res)=>{
          // console.log(message.author.id)
          //console.log(`${message.author.username} said`, message.content)
           const new_xp = res[0].xp_count + xp_inc
          // console.log(new_xp)
           connexion.query(`UPDATE xp SET xp_count = ${new_xp} WHERE user_id = "${message.author.id}"`, (err, res)=>{
            // console.log(err ?  err : res)
           })
        })
       
      

     

      // Ne pas tenir compte des messages envoyés par les bots, ou qui ne commencent pas par le préfix
      if (message.author.bot || !message.content.startsWith(COMMAND_PREFIX)) return;
 
      // On découpe le message pour récupérer tous les mots
      const words = message.content.split(' ');

      const commandName = words[0].slice(1); // Le premier mot du message, auquel on retire le préfix
      const arguments = words.slice(1); // Tous les mots suivants sauf le premier

      if (client.commands.has(commandName)) {
        // La commande existe, on la lance
        client.commands.get(commandName).run(client, message, arguments);
      } else {
        // La commande n'existe pas, on prévient l'utilisateur
        await message.delete();
        await message.channel.send(`The ${commandName} does not exist.`);
      }
      }
      
    })
  });