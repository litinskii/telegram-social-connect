import TelegramBot from 'node-telegram-bot-api';
import { createLinkToConnectProvider } from './models/users';
import _ from 'lodash';
import { getFriendsByProvider } from './api';
import Provider from './models/providers';

const { SERVER_URL, TOKEN, NODE_ENV } = process.env;
const getBotInstance = () => {
  let bot;
  if (NODE_ENV === 'production') {
    bot = new TelegramBot(TOKEN);
    bot.setWebHook(`${SERVER_URL}bot${TOKEN}`);
  } else {
    bot = new TelegramBot(TOKEN, { polling: true });
  }
  return bot;
};
const bot = getBotInstance();

bot.onText(/^\/connect/, ({ chat: { id }, message_id }) => {
  bot.sendMessage(id, 'What provider?', {
    reply_to_message_id: message_id,
    reply_markup: { force_reply: true }
  })
  .then(({ chat: { id }, message_id }) => {
    bot.onReplyToMessage(id, message_id, ({ text, message_id }) => {
      createLinkToConnectProvider(id, text)
      .then((link) => bot.sendMessage(id, link, { reply_to_message_id: message_id }))
      .catch(() => bot.sendMessage(id, 'Can not create link. Try again', { reply_to_message_id: message_id }));
    });
  });
});

bot.onText(/^\/friends/, ({ chat: { id }, message_id }) => {
  bot.sendMessage(id, 'What provider?', {
    reply_to_message_id: message_id,
    reply_markup: { force_reply: true }
  })
  .then(({ chat: { id }, message_id }) => {
    bot.onReplyToMessage(id, message_id, ({ text, message_id }) => {
      Provider.findOne({ telegramUser: id, providerType: text })
      .exec()
      .then((provider) => {
        if (_.isEmpty(provider)) throw new Error('Provider is not exist in database');
        const { accessToken, providerType } = provider;
        if (_.isEmpty(accessToken)) throw new Error('Provider access token is not exist in database');
        return getFriendsByProvider({ providerType, accessToken });
      })
      .then((friends) => {
        bot.sendMessage(
          id,
          _.map(friends, ({ name }) => `${name}`).join('\n') || 'List is empty',
          { reply_to_message_id: message_id }
        );
      })
      .catch(() => bot.sendMessage(id, 'Can not get friends.', { reply_to_message_id: message_id }));
    });
  });
});

export default bot;
