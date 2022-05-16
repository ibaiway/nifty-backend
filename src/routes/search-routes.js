import Router from 'express';
import { searchAll } from '../controllers/search-controller.js';
import authMiddleware from '../middlewares/auth-middleware.js';

const searchRouter = Router();

searchRouter.use('/search', authMiddleware);
searchRouter.get('/search/all/:text', searchAll);

export default searchRouter;
