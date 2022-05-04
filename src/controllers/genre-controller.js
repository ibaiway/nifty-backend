import GenreModel from '../models/genre-model.js';
import TrackModel from '../models/track-model.js';

async function getGenres(req, res, next) {
  try {
    const genre = await GenreModel.find({})
      .select('-__v -createdAt -updatedAt')
      .lean()
      .exec();
    res.status(200).send({
      data: genre
    });
  } catch (error) {
    next(error);
  }
}

async function getTrackByGenre(req, res, next) {
  const { id } = req.params;
  try {
    const TrackWithGenre = await TrackModel.find({ genre: id });
    if (TrackWithGenre) {
      res.status(200).send({
        data: TrackWithGenre
      });
    }
  } catch (error) {
    next(error);
  }
}

export { getGenres, getTrackByGenre };
