import Router from 'express';
import {
  getUser,
  updateUser,
  signUp,
  getCurrentUser,
  signUpWithProvider,
  getArtists
} from '../controllers/user-controller.js';
import authMiddleware from '../middlewares/auth-middleware.js';

const userRouter = Router();

userRouter.use('/account', authMiddleware);
userRouter.get('/account', getCurrentUser);
userRouter.get('/account/byartist', getArtists);
userRouter.get('/account/:id', getUser);
userRouter.put('/account', updateUser);
userRouter.post('/account/signup', signUp);
userRouter.post('/account/signupwithprovider', signUpWithProvider);

export default userRouter;
