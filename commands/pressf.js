module.exports = {
    name: "pressf",
    description: "",
    execute(message, args, Discord, client) {
      reacted = {}
      if (!args[0]) {
        return message.channel.send("You need to pay respects to something")
      }
      message.channel.send("Everyone, let's pay respects to **" + args.join(" ") + "**! Press the 🇫 reaction on this message to pay respects.").then(async sent => {
        reacted[sent.id] = []
        const filter = (r, u) => r.emoji.name === "🇫"
        await sent.react("🇫")
        collector = await sent.createReactionCollector(filter, {time: 60000})
        collector.on("collect", (r, u) =>{
          if (!reacted[sent.id].includes(u.id)) {
            sent.channel.send("**" + u.username + "** has payed their respects")
            reacted[sent.id].push(u.id)
          }
        })
        collector.on("end", c => {
          sent.channel.send("**" + reacted.length + "** people have payed respects to **" + args.join(" ") + "**")
          delete reacted[sent.id]
        })
      })
    }
  }