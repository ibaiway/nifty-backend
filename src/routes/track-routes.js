import Router from 'express';
import {
  getTracks,
  createTrack,
  updateTrack,
  getTrackById,
  deleteTrackById,
  likeTrackById,
  unlikeTrackById,
  getlikedTracks,
  getCurrentUserTracks,
  getTracksByUser
} from '../controllers/track-controller.js';
import authMiddleware from '../middlewares/auth-middleware.js';

const trackRouter = Router();

trackRouter.use('/track', authMiddleware);
trackRouter.get('/track', getTracks);
trackRouter.post('/track', createTrack);
trackRouter.get('/track/getliked', getlikedTracks);
trackRouter.get('/track/byartist', getCurrentUserTracks);
trackRouter.get('/track/byartist/:id', getTracksByUser);
trackRouter.put('/track/:id', updateTrack);
trackRouter.get('/track/:id', getTrackById);
trackRouter.delete('/track/:id', deleteTrackById);
trackRouter.put('/track/like/:id', likeTrackById);
trackRouter.put('/track/unlike/:id', unlikeTrackById);
export default trackRouter;
