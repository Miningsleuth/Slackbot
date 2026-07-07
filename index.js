require("dotenv").config();
const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/helper-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
});

app.command("/helper-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text:
`Available Commands:
/helper-ping - Check bot latency
/helper-help - Get this message
/helper-catfact - Get a cat fact`
  });
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();
