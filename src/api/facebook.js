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
      host: 'graph.facebook.com',
      pathname: `v2.5/${methodName}`
    }),
    qs: _.extend({
      access_token: accessToken
    }, parameters),
    json: true
  })
  .then(({ data, error }) => {
    if (error) throw new Error(`${error.code} ${error.message}`);
    return data;
  });
};

const getFriends = (accessToken) => {
  return send('me/friends', {
    fields: ['name', 'picture', 'link'].join(',')
  }, accessToken)
  .then((friends) => {
    return _.map(friends, ({ name, link, picture: { data: { url } } }) => {
      return {
        name,
        link,
        picture: url
      };
    });
  });
};

export {
  getFriends
};
