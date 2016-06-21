import * as fb from './facebook';
import * as vk from './vkontakte';

const { VKONTAKTE_PROVIDER_NAME, FACEBOOK_PROVIDER_NAME } = process.env;


const getFriendsByProvider = ({ providerType, accessToken }) => {
  switch (providerType) {
    case VKONTAKTE_PROVIDER_NAME:
      return vk.getFriends(accessToken);
    case FACEBOOK_PROVIDER_NAME:
      return fb.getFriends(accessToken);
    default:
      throw new Error('Provider is not exist in database');
  }
};

export {
  getFriendsByProvider
};
