import Router from 'express';
import {
  getGenres,
  getTrackByGenre,
  getGenreById
} from '../controllers/genre-controller.js';

const genreRouter = Router();
import authMiddleware from '../middlewares/auth-middleware.js';

genreRouter.use('/genres', authMiddleware);
genreRouter.get('/genres', getGenres);
genreRouter.get('/genres/tracks/:id', getTrackByGenre);
genreRouter.get('/genres/:id', getGenreById);

export default genreRouter;
