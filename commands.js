import fetch from 'node-fetch';

export let COMMANDS = {
    ".ip" : "hypocraft.apexmc.co",
    ".mention" : (msg, [user])=>{
        return user
    },
    ".head" : async (msg, [username])=>{
        const response = await fetch('https://api.mojang.com/users/profiles/minecraft/' + username);
        const data = await response.json();
        if(data != null){
            console.log("https://crafatar.com/renders/head/" + data["id"] + ".png")
            msg.channel.send("<" + username + ">", {files: ["https://crafatar.com/renders/head/" + data["id"] + ".png"]});
        }
    },
    ".body" : async (msg, [username])=>{
        const response = await fetch('https://api.mojang.com/users/profiles/minecraft/' + username);
        const data = await response.json();
        if(data != null){
            console.log("https://crafatar.com/renders/body/" + data["id"] + ".png")
            msg.channel.send("<" + username + ">", {files: ["https://crafatar.com/renders/body/" + data["id"] + ".png"]});
        }
    }
}