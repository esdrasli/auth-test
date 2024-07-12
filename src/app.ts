import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/authRoutes';
import swaggerUi from 'swagger-ui-express';
import path from 'path';
import fs from 'fs';
import errorHandler from './middleware/errorHandler';

const app = express();

app.use(bodyParser.json());
app.use('/auth', authRoutes);

app.use(express.static('public'));

const swaggerDocument = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../public/swagger.json'), 'utf8'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(errorHandler);

export default app;
