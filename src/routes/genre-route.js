import Router from 'express';
import { getGenres, getTrackByGenre } from '../controllers/genre-controller.js';

const genreRouter = Router();
import authMiddleware from '../middlewares/auth-middleware.js';

genreRouter.use('/genres', authMiddleware);
genreRouter.get('/genres', getGenres);
genreRouter.get('/genres/tracks/:id', getTrackByGenre);

export default genreRouter;
