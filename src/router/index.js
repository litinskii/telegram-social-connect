import express from 'express';
import { version } from '../../package.json';
import bot from '../bot';
import passport from 'passport';

const { SERVER_URL, TOKEN, VKONTAKTE_PROVIDER_NAME, FACEBOOK_PROVIDER_NAME } = process.env;
const router = express.Router();


router.get('/', (req, res) => {
  res.json({ version }).end();
});

router.post(`/bot${TOKEN}`, ({ body }, res) => {
  bot.processUpdate(body);
  res.status(200).end();
});


router.get(`/auth/connect/${VKONTAKTE_PROVIDER_NAME}/:linkToken`, (...args) => {
  const [{ params: { linkToken } }] = args;
  passport.authenticate(VKONTAKTE_PROVIDER_NAME, {
    callbackURL: `${SERVER_URL}auth/${VKONTAKTE_PROVIDER_NAME}/callback?linkToken=${encodeURIComponent(linkToken)}`,
    scope: ['friends']
  })(...args);
});

router.get(`/auth/${VKONTAKTE_PROVIDER_NAME}/callback`, (...args) => {
  const [{ query: { linkToken } }] = args;
  passport.authenticate(VKONTAKTE_PROVIDER_NAME, {
    callbackURL: `${SERVER_URL}auth/${VKONTAKTE_PROVIDER_NAME}/callback?linkToken=${encodeURIComponent(linkToken)}`,
    failureRedirect: '/'
  })(...args);
},
  ({ user: { id } }, res) => {
    bot.sendMessage(id, `Connect to ${VKONTAKTE_PROVIDER_NAME} done.`);
    res.redirect('/');
  }
);

router.get(`/auth/connect/${FACEBOOK_PROVIDER_NAME}/:linkToken`, (...args) => {
  const [{ params: { linkToken } }] = args;
  passport.authenticate(FACEBOOK_PROVIDER_NAME, {
    callbackURL: `${SERVER_URL}auth/${FACEBOOK_PROVIDER_NAME}/callback?linkToken=${encodeURIComponent(linkToken)}`,
    scope: ['user_friends', 'read_custom_friendlists']
  })(...args);
});

router.get(`/auth/${FACEBOOK_PROVIDER_NAME}/callback`, (...args) => {
  const [{ query: { linkToken } }] = args;
  passport.authenticate(FACEBOOK_PROVIDER_NAME, {
    callbackURL: `${SERVER_URL}auth/${FACEBOOK_PROVIDER_NAME}/callback?linkToken=${encodeURIComponent(linkToken)}`,
    failureRedirect: '/'
  })(...args);
},
  ({ user: { id } }, res) => {
    bot.sendMessage(id, `Connect to ${FACEBOOK_PROVIDER_NAME} done.`);
    res.redirect('/');
  }
);

export default router;
