import URL from 'url';
import _ from 'lodash';
import request from 'request-promise';

const send = (methodName, parameters, accessToken) => {
  if (!accessToken) {
    throw new Error('Token not provided!');
  }
  return request({
    url: URL.format({
      protocol: 'https',
      host: 'api.vk.com',
      pathname: `method/${methodName}`
    }),
    qs: _.extend({
      lang: 'en',
      v: '5.52',
      https: 1,
      access_token: accessToken
    }, parameters),
    json: true
  })
  .then(({ error, response: { items } }) => {
    if (error) throw new Error(`${error.error_code} ${error.error_msg}`);
    return items;
  });
};

const getFriends = (accessToken) => {
  return send('friends.get', {
    order: 'hints',
    fields: ['sex', 'photo_100', 'domain']
  }, accessToken)
  .then((friends) => {
    return _.map(friends, (friend) => {
      return {
        name: `${friend.first_name} ${friend.last_name}`,
        link: `https://vk.com/${friend.domain}`,
        picture: friend.photo_100
      };
    });
  });
};

export {
  getFriends
};
