module.exports = {
    name: "members",
    description: "Description here",
    async execute(message, args, Discord, client) {
      function splitList(list, size) {
        end = []
        len = 0
        x = 0
        end.push([])
        for (let i = 0; i < list.length; i++) {
          len = len + list[i].length + 1
          if (len > size) {
            len = 0
            x = x + 1
            end.push([])
          } 
          end[x].push(list[i])
        } 
        return end
      }
      page = 1
      data = []
      members = await message.guild.members.cache.map(x => `<@!${x.id}> (${x.id})`)
      data = splitList(members, 512)
      emb = new Discord.MessageEmbed()
        .setTitle("Members")
        .setDescription(data[page - 1].join("\n"))
        .setFooter("Page " + page + "/" + data.length)
      async function reload(page, msg) {
        emb.setDescription(data[page - 1].join("\n"))
        emb.setFooter("Page " + page + "/" + data.length)
        await msg.edit(emb).catch(e => e)
      }
  
      message.channel.send(emb).then(async msg => {
        await msg.react("⏮️")
        await msg.react("◀️")
        await msg.react("⏸️")
        await msg.react("▶️")
        await msg.react("⏭️")
        const collector = await msg.createReactionCollector((r, u) => u.id === message.author.id, { time: 300000, idle: 30000 })
        collector.on("collect", async e => {
          if (e.emoji.name === "▶️") {
            page = page + 1
          }
          if (e.emoji.name === "⏭️") {
            page = data.length 
          }
          if (e.emoji.name === "⏮️") {
            page = 1
          }
          if (e.emoji.name === "◀️") {
            page = page - 1
          }
          if (e.emoji.name === "⏸️") {
            msg.delete().catch(e => e)
            return;
          }
          if (page > data.length) {
            page = data.length
          }
          if (page < 1) {
            page = 1
          }
          if (msg.reactions.cache.get(e.emoji.name)) {
            await reload(page, msg)
          }
          await msg.reactions.cache.get(e.emoji.name).users.remove(message.author.id).catch(e => e)
        }) 
        collector.on("end", collected => msg.edit("This message is now marked as inactive!").catch(e => e))
      })
    }
  }
  