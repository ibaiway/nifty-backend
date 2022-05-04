import Router from 'express';
import {
  showPlaylists,
  createPlaylist,
  updatePlaylist,
  getPlaylist,
  deletePlaylist,
  followPlaylistById,
  unfollowPlaylistById
} from '../controllers/playlist-controller.js';
import authMiddleware from '../middlewares/auth-middleware.js';

const playlistRouter = Router();
playlistRouter.use('/playlist', authMiddleware);
playlistRouter.get('/playlist', showPlaylists);
playlistRouter.post('/playlist', createPlaylist);
playlistRouter.put('/playlist/:id', updatePlaylist);
playlistRouter.get('/playlist/:id', getPlaylist);
playlistRouter.delete('/playlist/:id', deletePlaylist);
playlistRouter.put('/playlist/follow/:id', followPlaylistById);
playlistRouter.put('playlist/unfollow/:id', unfollowPlaylistById);

export default playlistRouter;
