import passport from 'passport';
import { Strategy } from 'passport-facebook';
import { authConnectToProvider } from '../models/providers';

const { FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET } = process.env;

passport.use(new Strategy({
  clientID: FACEBOOK_CLIENT_ID,
  clientSecret: FACEBOOK_CLIENT_SECRET,
  passReqToCallback: true,
  apiVersion: '2.5'
}, authConnectToProvider));
