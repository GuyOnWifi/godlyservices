module.exports = {
    name: "clap",
    description: "CLAP CLAP CLAP",
    execute(message, args, Discord, client) {
      message.channel.send("👏 " + args.join(" 👏 ") + " 👏")
    }
  }