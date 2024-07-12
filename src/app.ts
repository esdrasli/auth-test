import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import fs from 'fs';
import errorHandler from './middleware/errorHandler';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use('/auth', authRoutes);

app.use(express.static('public'));

let swaggerDocument: object;
try {
  const swaggerPath = path.resolve(__dirname, '../public/swagger.json');
  const swaggerData = fs.readFileSync(swaggerPath, 'utf8');
  swaggerDocument = JSON.parse(swaggerData);
} catch (error) {
  console.error('Erro ao ler ou parsear o arquivo swagger.json:', error);
  process.exit(1);
}

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandler);

export default app;
