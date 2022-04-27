import verifyIdToken from './auth-providers.js';

function verifyAuthToken(token) {
  return verifyIdToken(token);
}

export default verifyAuthToken;
