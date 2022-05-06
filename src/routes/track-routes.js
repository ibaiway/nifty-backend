import Router from 'express';
import {
  getTracks,
  createTrack,
  updateTrack,
  getTrackById,
  deleteTrackById,
  likeTrackById,
  unlikeTrackById,
  getlikedTracks
} from '../controllers/track-controller.js';
import authMiddleware from '../middlewares/auth-middleware.js';

const trackRouter = Router();

trackRouter.use('/track', authMiddleware);
trackRouter.get('/track', getTracks);
trackRouter.post('/track', createTrack);
trackRouter.get('/track/getliked', getlikedTracks);
trackRouter.put('/track/:id', updateTrack);
trackRouter.get('/track/:id', getTrackById);
trackRouter.delete('/track/:id', deleteTrackById);
trackRouter.put('/track/like/:id', likeTrackById);
trackRouter.put('/track/unlike/:id', unlikeTrackById);
export default trackRouter;
