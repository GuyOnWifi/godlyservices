const Discord = require('discord.js');
//cahcing sucks
const client = new Discord.Client({
  allowedMentions: {
    parse: ["users"]
  },
  fetchAllMembers: true
});
const prefix = '??'
const hosting = require("./hosting.js")
const fs = require('fs');
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.on("message", message => {
  if (message.flags.has(["IS_CROSSPOST"])) {
    if (message.channel.id === 811331593041739816) {
       message.channel.send("<@599094069838348289> Success")
    }
  }
  
  
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
  if (!command) return;
  try {
   command.execute(message, args, Discord, client);
  } catch (error) {
    console.error(error);
    emb = new Discord.MessageEmbed()
      .setTitle(error.name)
      .setDescription(error.message)
    message.channel.send(emb)
    message.channel.send("https://media.tenor.co/videos/e9e954970fda1c96206bef594d774c67/mp4")
  }
});

client.on("ready", ()=> {
  console.log("Bot Ready!")
  client.api.applications(client.user.id).guilds("780972719932047381").commands.post({
    data: {
      name: "gw",
      description: "Giveaway",
      options: [
        {
          name: "donor",
          description: "The donor of this giveaway!",
          type: 6,
          required: true
        },
        {
          name: "msg",
          description: "The additional message of this giveaway",
          required: true,
          type: 3
        }
      ] 
    }
  })
})



client.ws.on("INTERACTION_CREATE", async interaction => {
  const command = interaction.data.name.toLowerCase()
  if (command === "gw") {
    if (interaction.channel_id === "804791591968571393"){
      pingRole = "<@&791892063435096085>"
    } else {
      pingRole = "<@&785608868083400734>"
    }
    const channels = ["813080113956126760", "804791591968571393", "780975241211805746", "780975218213519361", "780975266624700457", "780975289575931914"]
    if (!channels.includes(interaction.channel_id)) {
      return client.api.interactions(interaction.id, interaction.token).callback.post({
        data:{
          type: 3,
          data: {
            content: "haha you can't use this command in this channel"
          }
        }
      })
    }
    client.api.interactions(interaction.id, interaction.token).callback.post({
      data: {
        type: 3,
        data: {
          allowed_mentions: {
            parse: ["roles"]
          },
          content: pingRole,
          embeds: [
            {
              color: 15844367, 
              title: "Giveaway!",
              description: `**Donor:** <@!${interaction.data["options"][0]["value"]}>\n**Message:** ${interaction.data["options"][1]["value"]}`
            }
          ]
        }
      }
    })
  }
})

client.login(process.env.token)
