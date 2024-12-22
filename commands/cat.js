module.exports = {
    name: "cat",
    description: "Description here",
    execute(message, args, Discord, client) {
      async function exec() {
        const fetch = require("node-fetch")
        const { file } = await fetch('https://aws.random.cat/meow').then(response => response.json());
  
          await message.channel.send(file);
      }
      exec()
    }
  }