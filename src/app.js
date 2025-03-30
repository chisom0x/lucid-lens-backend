import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import router from './routes/index.js';
import globalErrorHandler from './middlewares/global_error_handler.js';

dotenv.config();

const corsOptions = {
  origin: true,
  optionsSuccessStatus: 200,
};

export const createServer = () => {
  const app = express();

  app.use(cors(corsOptions));
  app.options('*', cors(corsOptions));
  app.use(express.json({ limit: '5gb' }));
  app.use(express.urlencoded({ limit: '5gb', extended: true }));

  app.get('/', (req, res) => {
    res.json({ message: 'Hello World' });
  });

  app.use('/', router);
  app.use((err, req, res, next) => {
    globalErrorHandler(err, req, res, next);
  });

  return app;
};
