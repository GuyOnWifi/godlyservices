module.exports = {
    name: "ping",
    description: "Get server latency",
    execute(message, args, Discord, client) {
      message.channel.send('Pinging...').then(sent => {
        sent.edit(`Websocket Heartbeat: ${client.ws.ping}ms\nRoundtrip latency: ${sent.createdTimestamp - message.createdTimestamp}ms`);
      });
    }
  }