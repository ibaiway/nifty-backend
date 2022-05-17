import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import config from './config/config.js';
import userRouter from './routes/user-routes.js';
import trackRouter from './routes/track-routes.js';
import errorMiddleware from './middlewares/error-middleware.js';
import genreRouter from './routes/genre-route.js';
import playlistRouter from './routes/playlist-route.js';
import callStats from './controllers/stats-controller.js';
import searchRouter from './routes/search-routes.js';

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(
  cors({
    origin: config.client.URL
  })
);

app.use(userRouter);
app.use(trackRouter);
app.use(genreRouter);
app.use(playlistRouter);
app.get('/test', callStats);
app.use(searchRouter);

app.use(errorMiddleware);

export default app;
