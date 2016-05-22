import TelegramBot from 'node-telegram-bot-api';

const token = process.env.TOKEN;
const port = process.env.PORT;
const mode = process.env.NODE_ENV;

const url = `https://${process.env.HEROKU_NAME}.herokuapp.com/bot${token}`;
let bot;

if (mode === 'production') {
  bot = new TelegramBot(token, { webHook: { port } });
  bot.setWebHook(url);
} else {
  bot = new TelegramBot(token, { polling: true });
}

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, msg.text);
});
