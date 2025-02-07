import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoute'; 
import { logger } from './middleware/logger';
import { errorHandler } from './middleware/errorHandler';
import cors from "cors";
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

app.use(logger);

app.use('/api', userRoutes); 

app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Postgres auth server running on port ${port}`);
});
