module.exports = {
    name: "bu",
    description: "Cleanup all bot invoke messages and bot's messages",
    execute(message, args, Discord, client) {
      var cleanup = async() => {
        msglist = await message.channel.messages.fetch({ limit: 100 })
        msgs = msglist.filter(msg => msg.content.startsWith("??") || msg.author.id == message.guild.me.id)
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