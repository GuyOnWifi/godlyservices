module.exports = {
    name: "status",
    description: "This command changes the bots status\nValid statuses are `playing`, `watching`, `listening`, `competing`\nSyntax: `??status <A1> status` Such as ??status playing soccer! would change the bots status to Playing soccer\nCommand Is only useable for devs",
    execute(message, args, Discord, client) {
      allowed = ["599094069838348289", "702901731566157897"]
      if (!allowed.includes(message.author.id)) {
        return message.channel.send("No perms lol")
      }
      status = args.splice(1, args.length).join(" ")
      client.user.setActivity(status, {type: args[0].toUpperCase(), url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}).then(x => {
        message.channel.send(`Successfully changed my status to: ${status}`)
      })
    }
  }