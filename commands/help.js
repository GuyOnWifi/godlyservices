module.exports = {
    name: "help",
    description: "Shows this command and all other commands! run `??help <command>` for more info",
    execute(message, args, Discord, client) {
      cmds = client.commands.map(x => x.name)
      if (args[0]) {
        let searchcmd = args[0]
        const command = client.commands.get(searchcmd);
        if (!command) {
          return message.channel.send("I could not find the command you were looking for!")
        }
        aliases = command.aliases
        if (aliases) {
          aliases = aliases.join(", ")
        }
        let emb = new Discord.MessageEmbed()
          .setTitle(command.name.toUpperCase())
          .setDescription(command.description)
        message.channel.send(emb)
      }
      else {
        let emb = new Discord.MessageEmbed()
          .setTitle("Help Command!")
          .setDescription("??help [cmd] for more info\n**__List of all commands:__**\n" + "\`" + cmds.join("\`, \`") + "\`")
        message.channel.send("All code source here: https://replit.com/@kevtheepicasian/godlyservices", emb)
      }
    }
  }