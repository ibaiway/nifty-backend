import PlaylistModel from '../models/playlist-model.js';

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
          name: 1,
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

export { getPlaylistByUser };
