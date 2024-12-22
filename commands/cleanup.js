module.exports = {
    name: "cleanup",
    aliases: ["cu"],
    description: "Cleanup all bot invoke messages and bot's messages",
    execute(message, args, Discord, client) {
      if (!message.member.roles.cache.has("786076027688058902")) {
         return message.channel.send("bruh u got no perms")
      }
      var cleanup = async() => {
        msglist = await message.channel.messages.fetch({ limit: 100 })
        msgs = msglist.filter(msg => msg.content.startsWith("??") || msg.author.id == message.guild.me.id || msg.author.bot)
        try {
          message.channel.bulkDelete(msgs)
        }  
        catch(err) {
          console.log(err)
        } 
      }
      cleanup()
      
    }
  }