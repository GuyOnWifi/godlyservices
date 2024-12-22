module.exports = {
    name: "mtapcalc",
    description: "bot will follow questions if your in list to use command",
    async execute(message, args, Discord, client) {
     allowed = ['599094069838348289', "702901731566157897", "569223923309346836"]
     if (!allowed.includes(message.author.id)) {
       return message.channel.send("ur not in the list to use this cmd")
     }
     function filter(m) {
       return m.author === message.author
     }
     thing = []
     await message.channel.send("Send your weapon Damage %")
     await message.channel.awaitMessages(filter, {max: 1}).then(m => {thing[0] = m.first().content})
     await message.channel.send("Send your animal's mag amount")
     await message.channel.awaitMessages(filter, {max: 1}).then(m => {thing[1] = m.first().content})
     await message.channel.send("Send your weapon's mtap amount")
     await message.channel.awaitMessages(filter, {max: 1}).then(m => {thing[2] = m.first().content})
     await message.channel.send("Send your animal's wp amount")
     await message.channel.awaitMessages(filter, {max: 1}).then(m => {thing[3] = m.first().content})
     await message.channel.send("Send your weapon's wp amount")
     await message.channel.awaitMessages(filter, {max: 1}).then(m => {thing[4] = m.first().content})
     dmg = parseFloat(thing[0]) / 100
     mtap = parseFloat(thing[2]) / 100
     eq1 = dmg * parseFloat(thing[1])
     eq2 = mtap * eq1
     final = parseFloat(thing[3]) / (parseFloat(thing[4]) - eq2)
    casts = Math.floor(final)
     emb = new Discord.MessageEmbed()
        .setAuthor(message.author.username + "'s Weapon Stats", message.author.avatarURL())
        .setDescription(`**Owner:** ${message.author.username}\n**WP Cost:** ${thing[4]}\n**Description:** Sends a wave of energy and deals **${thing[0]}%** of your MAG to all opponents.\n\n**Casts:** ${casts}`)
     message.channel.send(emb)
    }
  }
  