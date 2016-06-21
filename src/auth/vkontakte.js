import passport from 'passport';
import { Strategy } from 'passport-vkontakte';
import { authConnectToProvider } from '../models/providers';

const { VKONTAKTE_CLIENT_ID, VKONTAKTE_CLIENT_SECRET } = process.env;

passport.use(new Strategy({
  clientID: VKONTAKTE_CLIENT_ID,
  clientSecret: VKONTAKTE_CLIENT_SECRET,
  passReqToCallback: true,
  apiVersion: '5.52'
}, authConnectToProvider));
