//dotenv
let dotenv = require('dotenv');
dotenv.config();
let express = require('express');
let bodyParser = require('body-parser');
let OpenAI = require('openai');

const openai = new OpenAI(
  {
    apiKey: process.env.OPENAI_API_KEY,
  }
);

const app = express();

app.use(bodyParser.json());

app.get('/', async (req, res) => {
  let content = await main();
  res.send(content);
});
let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})

async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "You are a helpful assistant." }],
    model: "gpt-3.5-turbo-16k",
  });

  return completion.choices[0].message.content;
}

