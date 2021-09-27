const Discord = require("discord.js")
let client;
let token = process.env.TOKEN || "ODkxOTQ5MjgzNTA1NDkxOTY4.YVFygA.6A" + "2JDZZprzabr2B3oVVG3iPwY78";
let channel_id = process.env.CHANNEL || 891933059673366538;
let restart_client;

let commands = require("./commands.js").COMMANDS

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
    if(commands[command] != null && commands[command] != ""){
      if(typeof commands[command] == "function"){
        console.log("ARGS: " + args.shift())
        let result = commands[command](msg, args)
        console.log("RESULT: " + result)
        if(result != null && result != ""){
          msg.reply(result)
        }
      }else{
        msg.reply(commands[command]);
      }      
    }
  })
  
  client.login(token)
}

const express = require('express')
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
