import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectMongoDB } from './db/connectMongoDB.js';
import logger from './middleware/logger.js';
import notFoundHandler from './middleware/notFoundHandler.js';
import errorHandler from './middleware/errorHandler.js';
import notesRouter from './routes/notesRoutes.js';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(logger);
app.use(cors());
app.use(express.json());

app.use(notesRouter);

app.use(notFoundHandler);
app.use(errorHandler);

const bootstrap = async () => {
  await connectMongoDB();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

bootstrap();
