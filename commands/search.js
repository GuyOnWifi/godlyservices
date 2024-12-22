module.exports = {
    name: "search",
    description: "",
    async execute(message, args, Discord, client) {
      const fetch = require("node-fetch")
      responce = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${args[0]}`).then(res => res.json())
      message.channel.send(responce[0]["meanings"].map(x => x.definitions.map(x => x.definition)).join("\n"))
      console.log(responce[0]["meanings"][0]["definitions"])
    }
  }