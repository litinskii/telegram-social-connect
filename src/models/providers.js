import mongoose, { Schema } from 'mongoose';
import _ from 'lodash';
import { isInvalidToken } from '../utils/token';

const ProviderSchema = new Schema({
  telegramUser: {
    type: Schema.Types.Number,
    ref: 'User'
  },
  userId: Schema.Types.Number,
  providerType: Schema.Types.String,
  linkToken: Schema.Types.String,
  accessToken: Schema.Types.String
});

const Provider = mongoose.model('Provider', ProviderSchema);
const authConnectToProvider = ({ query: { linkToken } }, accessToken, refreshToken, { id }, done) => {
  return Provider.findOne({ linkToken })
    .populate('telegramUser')
    .exec()
    .then((provider) => {
      if (_.isEmpty(provider)) throw new Error('Provider is not exist in database');
      const { telegramUser: { _id }, providerType } = provider;
      if (isInvalidToken(`${_id}-${providerType}`, linkToken)) throw new Error('Invalid token');
      return provider.set({ linkToken: null, accessToken, userId: id }).save();
    })
    .then(({ telegramUser }) => done(null, telegramUser))
    .catch(done);
};

export default Provider;
export {
  authConnectToProvider
};
