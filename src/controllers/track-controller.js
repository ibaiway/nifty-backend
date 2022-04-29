import TrackModel from '../models/track-model.js';

async function getTracks(res, next) {
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
    const { uid, title } = req.user;
    const track = await TrackModel.findOne({ title: title });
    if (title) {
      return res.status(200).send({ data: track });
    }
    const { url, duration, thumbnail, featuring, genre, likedBy } = req.body;
    const newTrack = await TrackModel.create({
      _id: uid,
      url,
      duration,
      thumbnail,
      featuring,
      genre,
      likedBy
    });
    res.status(201).send({ data: newTrack });
  } catch (error) {
    next(error);
  }
}

export { getTracks, createTrack };
