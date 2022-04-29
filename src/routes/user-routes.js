import Router from 'express';
import {
  getUser,
  updateUser,
  signUp,
  login,
  signUpWithProvider
} from '../controllers/user-controller.js';
import authMiddleware from '../middlewares/auth-middleware.js';

const userRouter = Router();

userRouter.use('/account', authMiddleware);
userRouter.get('/account/:id', getUser);
userRouter.put('/account/:id', updateUser);
userRouter.post('/account/signup', signUp);
userRouter.post('/account/signupwithprovider', signUpWithProvider);
userRouter.post('/account/login', login);

export default userRouter;
