import Discord from 'discord.js';
let client;
let token = process.env.TOKEN || "ODkxOTQ5MjgzNTA1NDkxOTY4.YVFygA.6A" + "2JDZZprzabr2B3oVVG3iPwY78";
let channel_id = process.env.CHANNEL || 891933059673366538;
let restart_client;

//let commands = require("./commands.js").COMMANDS
import {COMMANDS} from './commands.js';

RESTART_BOT(null)

function RESTART_BOT(res) {
  client = null;
  client = new Discord.Client()

  client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
    res?.send("restarted")
    //console.log(client.guilds)
  })
  
  client.on("message", (msg) => {
    const args = msg.content.slice(0).trim().split(/ +/g);
    const command = args[0]

    console.log(args)
    //if(msg.channel.id != channel_id) return
    if(COMMANDS[command] != null && COMMANDS[command] != ""){
      if(typeof COMMANDS[command] == "function"){
        console.log("ARGS: " + args.shift())
        let result = COMMANDS[command](msg, args)
        console.log("RESULT: " + result)
        if(result != null && result != ""){
          msg.reply(result)
        }
      }else{
        msg.reply(COMMANDS[command]);
      }      
    }
  })
  
  client.login(token)
}

import express from 'express'
const app = express()
const port = process.env.PORT || 8080

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.get('/restart', (req, res) => {
  RESTART_BOT(res);  
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
