import Router from 'express';
import {
  getUser,
  updateUser,
  signUp,
  getCurrentUser,
  signUpWithProvider,
  getArtists,
  followUserById,
  unfollowUserById
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
userRouter.put('/account/follow/:id', followUserById);
userRouter.put('/account/unfollow/:id', unfollowUserById);

export default userRouter;
