import Router from 'express';
import { getUser, editUser, signUp } from '../controllers/userController.js';
import authMiddleware from '../middlewares/auth-middleware.js';

const userRouter = Router();

userRouter.use('/account', authMiddleware);
userRouter.get('/account/:id', getUser);
userRouter.put('/account/:id', editUser);
userRouter.post('/account', signUp);

export default userRouter;
