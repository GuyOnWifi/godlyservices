module.exports = {
    name: 'viprole',
    description: 'Creates a VIP role.\nSyntax: `??viprole @user hex name of role`\nSuch as `??viprole @user FFFF00 My cool role!`\nOnly Moderators can use',
    execute(message, args, Discord, client) {
      if (!message.member.roles.cache.has("786075919546318878")) {
         return message.channel.send("bruh u got no perms")
       }
      user = args[0]
      if (user.startsWith("<@") && user.endsWith(">")) {
        user = user.slice(2, -1);
        if (user.startsWith("!")) {
          user = user.slice(1);
        }
      }
      message.guild.roles.create({
      data: {
        name: args.join(" ").replace(args[0], "").replace(args[1], ""),
        color: args[1],
        position: 70,
      },
      reason: 'VIP role created.',
      }).then(role => {
        message.guild.members.fetch(user).then(member => {
          member.roles.add(role).then(m => {
            message.channel.send(`\`@${role.name}\` role was created and added to **${m.user.username}**`)
          })
        }) 
      }) 
    } 
  }