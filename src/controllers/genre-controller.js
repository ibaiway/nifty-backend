import GenreModel from '../models/genre-model.js';
import TrackModel from '../models/track-model.js';
import { trackService } from '../services/index.js';

async function getGenres(_req, res, next) {
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
  const { uid } = req.user;
  try {
    const TrackWithGenre = await trackService.getTracksAggregate({
      genre: id,
      uid: uid
    });
    if (TrackWithGenre) {
      res.status(200).send({
        data: TrackWithGenre
      });
    }
  } catch (error) {
    next(error);
  }
}

async function getGenreById(req, res, next) {
  const { id } = req.body;
  try {
    const genre = await GenreModel.findOneById(id)
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

export { getGenres, getTrackByGenre };
