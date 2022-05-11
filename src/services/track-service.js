import TrackModel from '../models/track-model.js';
import {
  fieldsToProject,
  lookupUser,
  lookupGenre
} from '../utils/mdb/track-utils.js';
import { parseToObjectId } from '../utils/mdb/mongo-utils.js';

async function createTrack(uid, userInfo) {
  try {
    const track = TrackModel.create({ ...userInfo, userId: uid });
    return track;
  } catch (error) {
    throw error;
  }
}

async function getTracksAggregate(uid) {
  try {
    const tracks = await TrackModel.aggregate([
      {
        $addFields: {
          isLiked: {
            $cond: {
              if: { $in: [uid, '$likedBy'] },
              then: true,
              else: false
            }
          }
        }
      },
      {
        $lookup: lookupGenre()
      },
      {
        $lookup: lookupUser()
      },
      {
        $unwind: '$genre'
      },
      {
        $unwind: '$artist'
      },
      {
        $project: fieldsToProject()
      }
    ]);

    return tracks;
  } catch (error) {
    throw error;
  }
}

async function getTracksByIdAggregate(uid, id) {
  try {
    const parsedId = parseToObjectId(id);
    const track = await TrackModel.aggregate([
      {
        $match: { _id: parsedId }
      },
      {
        $addFields: {
          isLiked: {
            $cond: {
              if: { $in: [uid, '$likedBy'] },
              then: true,
              else: false
            }
          }
        }
      },
      {
        $lookup: lookupGenre()
      },
      {
        $lookup: lookupUser()
      },
      {
        $unwind: '$genre'
      },
      {
        $unwind: '$artist'
      },
      {
        $project: fieldsToProject()
      }
    ]);

    return track;
  } catch (error) {
    throw error;
  }
}

async function getTracksByArtist(uid) {
  try {
    const track = await TrackModel.aggregate([
      {
        $match: { userId: uid }
      },
      {
        $addFields: {
          isLiked: {
            $cond: {
              if: { $in: [uid, '$likedBy'] },
              then: true,
              else: false
            }
          }
        }
      },
      {
        $lookup: lookupGenre()
      },
      {
        $lookup: lookupUser()
      },
      {
        $unwind: '$genre'
      },
      {
        $unwind: '$artist'
      },
      {
        $project: fieldsToProject()
      }
    ]);

    return track;
  } catch (error) {
    throw error;
  }
}

async function getLikedTracksAgreggate(uid) {
  try {
    const tracks = await TrackModel.aggregate([
      {
        $match: { likedBy: uid }
      },
      {
        $addFields: {
          isLiked: true
        }
      },
      {
        $unset: ['likedBy', '__v', 'createdAt', 'updatedAt']
      },
      {
        $lookup: lookupGenre()
      },
      {
        $lookup: lookupUser()
      },
      {
        $unwind: '$genre'
      },
      {
        $unwind: '$artist'
      },
      {
        $project: fieldsToProject()
      }
    ]);

    return tracks;
  } catch (error) {
    throw error;
  }
}

async function likeTrackById(uid, id) {
  try {
    const likedTrack = await TrackModel.findOneAndUpdate(
      { _id: id },
      {
        $addToSet: {
          likedBy: uid
        }
      }
    );
    return likedTrack;
  } catch (error) {
    throw error;
  }
}

async function unlikeTrackById(uid, id) {
  try {
    const unlikedTrack = await TrackModel.findOneAndUpdate(
      { _id: id },
      {
        $pull: {
          likedBy: uid
        }
      }
    );
    return unlikedTrack;
  } catch (error) {
    throw error;
  }
}

async function updateTrack(uid, trackInfo) {
  try {
    const track = await TrackModel.findOneAndUpdate(
      {
        _id: uid
      },
      {
        $set: {
          ...trackInfo
        }
      }
    );
    return track;
  } catch (error) {
    throw error;
  }
}

async function deleteTrackById(uid, id) {
  try {
    const unlikedTrack = TrackModel.deleteOne({ _id: id, userId: uid });
    return unlikedTrack;
  } catch (error) {
    throw error;
  }
}

export {
  getTracksAggregate,
  getTracksByIdAggregate,
  getTracksByArtist,
  getLikedTracksAgreggate,
  likeTrackById,
  unlikeTrackById,
  deleteTrackById,
  createTrack,
  updateTrack
};
