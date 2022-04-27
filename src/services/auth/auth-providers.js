import admin from 'firebase-admin';
import config from '../../config/config.js';

admin.initializeApp({
  credential: admin.credential.cert(config.firebase.certConfig)
});

const auth = admin.auth();

function verifyIdToken(token) {
  return auth.verifyIdToken(token);
}

export default verifyIdToken;
