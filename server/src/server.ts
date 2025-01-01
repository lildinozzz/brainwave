import express, { Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { authRouter, tokensRouter, paymentRouter } from '@routers';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || '3000';

const ALLOWED_ORIGINS = ['http://localhost:5173'];

app.use(
  cors({
    origin: (origin, callback) => {
      if (origin && ALLOWED_ORIGINS.includes(origin)) {
        callback(null, true); // Разрешаем запрос
      } else {
        callback(new Error('Not allowed by CORS'), false);
      }
    },
    credentials: true,
  })
);
app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static('images'));
app.use(express.static('public'));

app.use('/api/auth', authRouter);
app.use('/api/tokens', tokensRouter);
app.use('/api/payment', paymentRouter);

app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server has started on PORT ${PORT}`);
});
