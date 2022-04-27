import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import config from './config/config.js';
import userRouter from './routes/user-routes.js';

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
export default app;
