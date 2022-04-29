import Router from 'express';
import { getTracks } from '../controllers/track-controller.js';
import authMiddleware from '../middlewares/auth-middleware.js';

const userRouter = Router();

userRouter.get('/track', getTracks);
userRouter.post('/track', createTrack);
userRouter.put('/track', updateTrack);
userRouter.get('/track', getTrackById);
userRouter.delete('/track', deleteTrackById);
userRouter.get('/track/like', checkIfUserLiked);
userRouter.put('/track/like', likeTrackById);
userRouter.put('/track/play', playTrackById);
export default userRouter;
