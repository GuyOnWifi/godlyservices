module.exports = {
    name: "thxheist",
    description: "",
    execute(message, args, Discord, client) {
      function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
      function shorten(x) {
        return parseInt(x.replace("k", "000").replace("m", "000000").trim())
      }
      function getUser(user) {
        if (user.startsWith("<@") && user.endsWith(">")) {
          user = user.slice(2, -1);
          if (user.startsWith("!")) {
            user = user.slice(1);
          }
        }
        user = message.guild.members.cache.get(user)
        if (!user) {
          user = message.guild.members.cache.find(member => member.username === user)
        }
        return user
      }
      if (!message.member.roles.cache.get("786091821146570763")) {
        return message.channel.send("no perms lol")
      }
      number = numberWithCommas(shorten(args[0]))
      user = getUser(args.join(" ").replace(args[0], "").trim())
      emb = new Discord.MessageEmbed()
        .setAuthor(message.guild.name, message.guild.iconURL())
        .setTitle("Thanks for the heist!")
        .setDescription(`Thank <@!${user.id}> in <#780972720431038536> for this \`${number}\` heist!
        DM a heist manager or higher to host your own heist! (min amnt 1 mil)
  
        __**If you are a freeloader**__
        You will be banned!
        But make sure to check out <#780975667919323196> and see what your missing out on if you freeload
        We have multiple heists and giveaways daily`)
        .setFooter("Thanks for the heist!", user.user.avatarURL())
        .setThumbnail("https://cdn.discordapp.com/emojis/753702495905120266.png?v=1")
        .setColor("#FAE95A")
      message.channel.send(emb)
      message.delete({ timeout: 500 })
      member = message.guild.member(user)
      member.roles.add("794623824087482389").then(role => {
        setTimeout(() => {
          member.roles.remove("794623824087482389")
        }, 90000)
      })
    }
  }