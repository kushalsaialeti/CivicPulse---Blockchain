import express from 'express';
import cors from 'cors';
import civicRoutes from './routes/civic.routes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/civic', civicRoutes);

export default app;
