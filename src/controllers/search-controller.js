import { searchPlaylists } from '../services/playlist-service.js';
import { searchTracks } from '../services/track-service.js';
import { searchUsers } from '../services/user-service.js';

async function searchAll(req, res, next) {
  try {
    const { uid } = req.user;
    const { text } = req.params;
    const filter = { regex: decodeURIComponent(text) };
    const [playlists, tracks, users] = await Promise.all([
      searchPlaylists(filter),
      searchTracks(...filter, uid),
      searchUsers(filter)
    ]);

    res.status(200).send({
      data: {
        playlists,
        tracks,
        users
      }
    });
  } catch (error) {
    next(error);
  }
}

export { searchAll };
