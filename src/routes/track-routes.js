import Router from 'express';
import {
  getTracks,
  createTrack,
  updateTrack,
  getTrackById,
  deleteTrackById,
  likeTrackById
} from '../controllers/track-controller.js';

const trackRouter = Router();

trackRouter.get('/track', getTracks);
trackRouter.post('/track', createTrack);
trackRouter.put('/track', updateTrack);
trackRouter.get('/track', getTrackById);
trackRouter.delete('/track', deleteTrackById);
trackRouter.put('/track/like', likeTrackById);
export default trackRouter;
