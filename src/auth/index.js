import passport from 'passport';
import User from '../models/users';
import './vkontakte';
import './facebook';

const auth = () => {
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => User.findById(id, done));
};

export default auth;
