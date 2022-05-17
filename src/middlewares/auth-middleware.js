import { auth } from '../services/index.js';
import config from '../config/config.js';

async function authMiddleware(req, res, next) {
  try {
    const bearerToken = await auth.getAuthToken(req.headers);
    const userClaims = await auth.verifyAuthToken(bearerToken);
    auth.login(req, userClaims);

    next();
  } catch (error) {
    config.debug(error);

    res.status(401).send({
      data: null,
      error: 'Unauthorized'
    });
  }
}

export default authMiddleware;
