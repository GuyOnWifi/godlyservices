module.exports = {
    name: "boosterchannel",
    aliases: ["boosterchan"],
    description: "Creates a private channel for boosters\n`??boosterchannel @user channelname`\nOnly Useable from moderators",
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
     message.guild.channels.create(args.join(" ").replace(args[0], ""), {
       permissionOverwrites: [
         {
           id: user,
           allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "MANAGE_CHANNELS", "MANAGE_MESSAGES", "EMBED_LINKS", "ATTACH_FILES"]
         },
         {
           id: message.guild.roles.everyone,
           deny: ["VIEW_CHANNEL"]
         }
       ],
       parent: "791479201286586410"
     }).then(channel =>{
       message.channel.send(`${channel.name} was created`)
     })
   }
 }