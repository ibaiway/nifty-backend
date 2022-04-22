import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import config from './config/config.js';

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(express.json());
app.use(
  cors({
    origin: config.client.URL
  })
);

export default app;
