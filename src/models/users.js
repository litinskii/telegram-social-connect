import mongoose, { Schema } from 'mongoose';
import Promise from 'bluebird';
import Provider from './providers';
import { createToken } from '../utils/token';

const { SERVER_URL } = process.env;
const UserSchema = new Schema({
  _id: Schema.Types.Number,
  providers: [{
    type: Schema.Types.ObjectId,
    ref: 'Provider'
  }]
});

const User = mongoose.model('User', UserSchema);

const createUserLinkTokenToConnectProvider = (telegramUserId, providerType) => {
  const linkToken = createToken(`${telegramUserId}-${providerType}`);
  return Promise.all([
    User.findOneAndUpdate(
      { _id: telegramUserId },
      { _id: telegramUserId },
      { upsert: true, new: true }
    ).exec(),
    Provider.findOneAndUpdate(
      { telegramUser: telegramUserId, providerType },
      {
        telegramUser: telegramUserId,
        providerType,
        linkToken
      },
      { upsert: true, new: true }
    ).exec()
  ])
  .spread((user, provider) => {
    user.providers.addToSet(provider);
    return user.save();
  })
  .then(() => linkToken);
};

const createLinkToConnectProvider = (id, provider) => {
  return createUserLinkTokenToConnectProvider(id, provider)
    .then((linkToken) => `${SERVER_URL}auth/connect/${provider}/${encodeURIComponent(linkToken)}`);
};

export default User;
export {
  createLinkToConnectProvider
};
