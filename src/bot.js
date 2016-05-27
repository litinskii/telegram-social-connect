import TelegramBot from 'node-telegram-bot-api';

const token = process.env.TOKEN;
const mode = process.env.NODE_ENV;
let bot;

if (mode === 'production') {
  bot = new TelegramBot(token);
  bot.setWebHook(`https://${process.env.HEROKU_NAME}.herokuapp.com/bot${token}`);
} else {
  bot = new TelegramBot(token, { polling: true });
}

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, msg.text);
});

export default bot;
