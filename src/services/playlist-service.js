import PlaylistModel from '../models/playlist-model.js';
import { parseToObjectId } from '../utils/mdb/mongo-utils.js';
import { getTracksAggregate } from './track-service.js';

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

async function getPlaylistById(uid, id) {
  try {
    const parsedId = parseToObjectId(id);
    const playlist = await PlaylistModel.aggregate([
      {
        $match: {
          _id: parsedId
        }
      },
      {
        $addFields: {
          isFollowed: {
            $cond: {
              if: { $in: [uid, '$followedBy'] },
              then: true,
              else: false
            }
          },
          followedBy: {
            $size: '$followedBy'
          }
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $unwind: '$user'
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          thumbnail: 1,
          'user._id': 1,
          'user.firstName': 1,
          isFollowed: 1,
          followedBy: 1,
          tracks: 1
        }
      }
    ]);
    const tracksParsedToString = playlist[0].tracks.map((track) =>
      track.toString()
    );
    const tracks = await getTracksAggregate(uid, tracksParsedToString);
    const playlistWithTracks = {
      ...playlist[0],
      tracks
    };
    return playlistWithTracks;
  } catch (error) {
    throw error;
  }
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

export {
  getPlaylistById,
  getPlaylistByUser,
  addTrackToPlaylist,
  removeTrackFromPlaylist
};
