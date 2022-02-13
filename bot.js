const clientLoader = require('./src/clientLoader');
const commandLoader = require('./src/commandLoader');
const utils = require('./src/utilities')
require('colors');

const  mySQL = require('mysql')
require('dotenv').config()


const awaken_hollow ="942015352232083497" // <-- ici pour awaken-hollow

const connexion = mySQL.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
})
connexion.connect((err) => console.log(err ?  err : "db connected"))

const COMMAND_PREFIX = '!';
const SUPER_ADMINISTRATOR =process.env.SUPER_ADMINISTRATOR

clientLoader.createClient(['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'DIRECT_MESSAGES'])
  .then(async (client) => {
    commandLoader.load(client);

    client.on('guildMemberAdd', async (member) => {
      console.log("new member detected")
        const hollowRole = "940638533612339261"
        member.roles.add(hollowRole)
          .then(()=>{
            console.log(`Role added: ${hollowRole} to ${member.displayName}`)
            connexion.query(`SELECT user_id FROM xp WHERE user_id = "${member.id}"`,(err, res)=>{
              console.log(err)
              if(res.length > 0){
                console.log(`${member.displayName} already in db`)
                return 
              } else {
                const channel = client.channels.cache.find(channel => channel.id == awaken_hollow)
                console.log(channel.name)
                channel.send("Welcome **"+ member.displayName +"** you are to your first level, send messages to channels to grant `xp`. you'll find the `!help [args]` command if you need help. Go to [test](https://discord.com/channels/735110593706459249/942385627037597727) to experiment !")


                connexion.query(`INSERT INTO xp (user_id, xp_count, level) VALUES("${member.id}", 0, 0)`,(err, res)=>{
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
            // Ne pas tenir compte des messages envoyés par les bots, ou qui ne commencent pas par le préfix
            if (message.author.bot || !message.content.startsWith(COMMAND_PREFIX)){
             
              return;
            } 
       
      xp_inc = 4
      try{

        connexion.query(`UPDATE xp SET xp_count = xp_count + ` + xp_inc +`  WHERE user_id = '${message.author.id}'`,(err, res)=>{
          console.log(`${message.author.username} said`, message.content)

        })
        connexion.query(`SELECT xp_count, level from xp WHERE user_id = '${message.author.id}' `, (err, res) =>{
          console.log(res)
          const arrayoflevel = [20, 50, 100, 200,400]
          const xp_count = res[0].xp_count;
          console.log(xp_count)
    
          for (let i = 0; i < arrayoflevel.length; i++){
            if (xp_count <= arrayoflevel[i]){
              let new_level = i+1
              if(new_level > res[0].level){
                connexion.query(`UPDATE xp set level = ${new_level} where  user_id = '${message.author.id}' `)
                console.log("new level aquired")
                message.reply("new level aquired : Current level" + new_level )
              }
             
              //if(new_level > )
            break
             }
          }
    
         })
      } catch (e){
        console.log(e)
      }


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

      
    })
  });