import * as token from 'token';
const { LINK_TOKEN_SECRET, LINK_TOKEN_TIME_STEP } = process.env;

token.defaults.secret = LINK_TOKEN_SECRET;
token.defaults.timeStep = parseInt(LINK_TOKEN_TIME_STEP, 10);

const createToken = (string) => token.generate(`${string}`);
const isInvalidToken = (string, tokenString) => token.verify(string, tokenString) !== 1;

export {
  createToken,
  isInvalidToken
};
