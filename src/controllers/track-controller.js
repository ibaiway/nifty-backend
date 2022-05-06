import TrackModel from '../models/track-model.js';

async function getTracks(req, res, next) {
  try {
    const tracks = await TrackModel.find({})
      .populate('genre')
      .select('-__v -createdAt -updatedAt')
      .lean()
      .exec();
    res.status(200).send({
      data: tracks
    });
  } catch (error) {
    next(error);
  }
}

async function createTrack(req, res, next) {
  try {
    const { uid } = req.user;
    const { url, duration, thumbnail, title, featuring, genre, active } =
      req.body;
    const newTrack = await TrackModel.create({
      userId: uid,
      title,
      url,
      duration,
      thumbnail,
      featuring,
      genre,
      active
    });
    res.status(201).send({ data: newTrack });
  } catch (error) {
    next(error);
  }
}

async function updateTrack(req, res, next) {
  const { id } = req.params;
  const { title, genre, url, duration, thumbnail, active, featuring, likedBy } =
    req.body;

  try {
    const updatedTrack = await TrackModel.findOneAndUpdate(
      {
        _id: id
      },
      {
        $set: {
          title: title,
          url: url,
          duration: duration,
          thumbnail: thumbnail,
          active: active,
          featuring: featuring,
          likedBy: likedBy,
          genre: genre
        }
      },
      {
        new: true
      }
    ).select({
      title: 1,
      url: 1
    });

    res.status(200).send({
      data: updatedTrack
    });
  } catch (error) {
    next(error);
  }
}

async function getTrackById(req, res, next) {
  const { id } = req.params;
  try {
    const track = await TrackModel.findById(id)
      .populate('genre')
      .select('-__v -createdAt -updatedAt')
      .lean()
      .exec();
    if (track) {
      res.status(200).send({
        data: track
      });
    } else {
      res.status(404).send({
        error: 'Track not found'
      });
    }
  } catch (error) {
    next(error);
  }
}

async function deleteTrackById(req, res, next) {
  const { id } = req.params;
  const { uid } = req.user;
  try {
    const track = await TrackModel.deleteOne({ _id: id, userId: uid });
    if (track !== null) {
      res.status(200).send({
        message: 'Track deleted'
      });
    } else {
      res.status(404).send({
        error: 'Track not found'
      });
    }
  } catch (error) {
    next(error);
  }
}

async function likeTrackById(req, res, next) {
  const { id } = req.params;
  const { uid } = req.user;

  try {
    const newLikes = await TrackModel.findOneAndUpdate(
      { _id: id },
      {
        $addToSet: {
          likedBy: uid
        }
      },
      {
        new: true
      }
    );
    res.status(200).send({
      data: newLikes
    });
  } catch (error) {
    next(error);
  }
}

async function unlikeTrackById(req, res, next) {
  const { id } = req.params;
  const { uid } = req.user;

  try {
    const unLiked = await TrackModel.findOneAndUpdate(
      { _id: id },
      {
        $pull: {
          likedBy: uid
        }
      },
      {
        new: true
      }
    );
    res.status(200).send({
      data: unLiked
    });
  } catch (error) {
    next(error);
  }
}

async function getlikedTracks(req, res, next) {
  const { uid } = req.user;
  try {
    const tracks = await TrackModel.find({
      likedBy: uid
    })
      .populate('genre')
      .select('-__v -createdAt -updatedAt')
      .lean()
      .exec();
    res.status(200).send({
      data: tracks
    });
  } catch (error) {
    next(error);
  }
}

export {
  getTracks,
  createTrack,
  updateTrack,
  getTrackById,
  deleteTrackById,
  likeTrackById,
  unlikeTrackById,
  getlikedTracks
};
