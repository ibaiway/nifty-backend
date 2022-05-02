import UserModel from '../models/user-model.js';

async function artistMiddleWare(res, req, next) {
  try {
    const { uid } = req.user;
    const user = UserModel.find({ uid });
    if (user.artist === true) {
      next();
    } else {
      res.status(403).send({
        error: 'User is not an artist'
      });
    }
  } catch (error) {
    next(error);
  }
}

export default artistMiddleWare;
