module.exports = {
    name: "notquitenitro",
    cooldown: 1,
    aliases: ["nqn"],
    description: "Description here",
    execute(message, args, Discord, client) {
      emoji = client.emojis.cache.find(x => x.name === args[0])
      if (!emoji) {
        return message.channel.send("Could not find that emoji!")
      }
      if (emoji.animated) {
        return message.channel.send(`<a:${emoji.name}:${emoji.id}>`)
      }
      return message.channel.send(`<:${emoji.name}:${emoji.id}>`)
    }
  }