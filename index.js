const axios = require("axios");
require("dotenv").config();
const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/helper-catfact", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://catfact.ninja/fact");
    await respond({ text: `Cat Fact:\n${response.data.fact}` });
  } catch (err) {
    await respond({ text: "Failed to fetch a cat fact." });
  }
});

app.command("/helper-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms\nWhoa! Nice, a ping!` });
});

app.command("/helper-help", async ({ ack, respond }) => {
  await ack();
  await respond({
    text:
`Available Commands:
/helper-ping - Check bot latency
/helper-help - Get this message
/helper-catfact - Get a cat fact
/helper-joke - Get a joke
/helper-fact - Get a general fact`
  });
});

app.command("/helper-joke", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://official-joke-api.appspot.com/random_joke");
    await respond({
      text:
`${response.data.setup}

${response.data.punchline}`
    });
  } catch (err) {
    await respond({ text: "Failed to fetch a joke :(" });
  }
});

app.command("/helper-fact", async ({ ack, respond }) => {
  await ack();

  try {
    const response = await axios.get("https://uselessfacts.jsph.pl/api/v2/facts/random?language=en");
    await respond({
      text:
`${response.data.text}`
    });
  } catch (err) {
    await respond({ text: "Failed to fetch a fact :(" });
  }
});

(async () => {
  await app.start();
  console.log("I am running!");
})();
