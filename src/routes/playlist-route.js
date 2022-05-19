import Router from 'express';
import {
  showPlaylists,
  createPlaylist,
  updatePlaylist,
  getPlaylist,
  deletePlaylist,
  followPlaylistById,
  unfollowPlaylistById,
  getPlaylistByCurrentUser,
  getPlaylistByUser,
  addTrackToPlaylist,
  removeTrackFromPlaylist,
  getUsersFollowingPlaylist,
  getPopularPlaylists
} from '../controllers/playlist-controller.js';
import authMiddleware from '../middlewares/auth-middleware.js';

const playlistRouter = Router();
playlistRouter.use('/playlist', authMiddleware);
playlistRouter.get('/playlist', showPlaylists);
playlistRouter.post('/playlist', createPlaylist);
playlistRouter.post('/playlist/popular', getPopularPlaylists);
playlistRouter.get('/playlist/followed', getUsersFollowingPlaylist);
playlistRouter.get('/playlist/byuser', getPlaylistByCurrentUser);
playlistRouter.get('/playlist/byuser/:id', getPlaylistByUser);
playlistRouter.put('/playlist/:id', updatePlaylist);
playlistRouter.get('/playlist/:id', getPlaylist);
playlistRouter.delete('/playlist/:id', deletePlaylist);
playlistRouter.put('/playlist/:id/add', addTrackToPlaylist);
playlistRouter.put('/playlist/:id/remove', removeTrackFromPlaylist);
playlistRouter.put('/playlist/follow/:id', followPlaylistById);
playlistRouter.put('/playlist/unfollow/:id', unfollowPlaylistById);

export default playlistRouter;
