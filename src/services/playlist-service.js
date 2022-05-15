import PlaylistModel from '../models/playlist-model.js';
import { parseToObjectId } from '../utils/mdb/mongo-utils.js';

function matchFilter(uid, includePrivate) {
  let filter = {};
  if (uid) {
    filter.userId = uid;
  }
  if (!includePrivate) {
    filter.publicAccessible = true;
  }
  return filter;
}

async function getPlaylistByUser(uid, includePrivate = false) {
  try {
    const playlists = await PlaylistModel.aggregate([
      {
        $match: matchFilter(uid, includePrivate)
      },
      {
        $project: {
          _id: 1,
          name: 1,
          thumbnail: 1,
          tracks: {
            $size: '$tracks'
          }
        }
      }
    ]);
    return playlists;
  } catch (error) {
    throw error;
  }
}

async function addTrackToPlaylist(uid, id, track) {
  try {
    const parsedTrack = parseToObjectId(track);
    const playlist = await PlaylistModel.findOneAndUpdate(
      { _id: id, userId: uid },
      { $addToSet: { tracks: parsedTrack } }
    );
    return playlist;
  } catch (error) {
    throw error;
  }
}

async function removeTrackFromPlaylist(uid, id, track) {
  try {
    const parsedTrack = parseToObjectId(track);
    const playlist = await PlaylistModel.findOneAndUpdate(
      { _id: id, userId: uid },
      { $pull: { tracks: parsedTrack } }
    );
    return playlist;
  } catch (error) {
    throw error;
  }
}

export { getPlaylistByUser, addTrackToPlaylist, removeTrackFromPlaylist };
