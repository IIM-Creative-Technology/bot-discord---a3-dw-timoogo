

const WelcomeTheHollow = () =>{
    
}
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
  const  mySQL = require('mysql')
require('dotenv').config()
const connexion = mySQL.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
})

module.exports = {
    WelcomeTheHollow,
    sleep,
}