import TrackModel from '../models/track-model.js';

async function getTracks(res, req, next) {
  try {
    const tracks = await TrackModel.find({})
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

async function updateTrack(res, req, next) {
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

async function getTrackById(res, req, next) {
  const { id } = req.params;
  try {
    const track = await TrackModel.findOne({ id })
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

async function deleteTrackById(res, req, next) {
  const { id } = req.params;
  try {
    const track = await TrackModel.deleteById({ id });
    res.status(200);
  } catch (error) {
    next(error);
  }
}

async function likeTrackById(res, req, next) {
  const { id } = req.params;
  const { uid } = req.user;

  try {
    const newLikes = await TrackModel.updateOne(
      { id: id },
      {
        $push: {
          likedBy: uid
        }
      }
    );
    res.status(200).send({
      data: newLikes
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
  likeTrackById
};
