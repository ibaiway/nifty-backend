import Router from 'express';
import { getUser, editUser, signUp } from '../controllers/userController.js';
const userRouter = Router();

userRouter.get('/account/:id', getUser);
userRouter.put('/account/:id', editUser);
userRouter.post('/account', signUp);

export default userRouter;
