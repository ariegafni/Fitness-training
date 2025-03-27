import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import workoutTypeRoutes from './routes/workoutType';
import workoutRoutes from './routes/workout';

const app = express();
const PORT = 1000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/workout-app';

app.use(cors());
app.use(bodyParser.json());

app.get('/isAlive', (req, res) => {
  res.status(200).send('Server is alive');
});

app.use('/api/workout-types', workoutTypeRoutes);
app.use('/api/workouts', workoutRoutes);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => console.error('MongoDB connection error:', err));
