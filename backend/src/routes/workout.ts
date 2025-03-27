import express from 'express';
import Workout from '../models/Workout';
import WorkoutType from '../models/WorkoutType';

const router = express.Router();

// התחלת אימון חדש
router.post('/start', async (req : any, res : any) => {
  const { workoutTypeId } = req.body;
  const workoutType = await WorkoutType.findById(workoutTypeId);
  if (!workoutType) return res.sendStatus(404);

  const existingActive = await Workout.findOne({ status: 'active' });
  if (existingActive) return res.status(400).json({ message: 'Workout already active' });

  const workout = new Workout({
    workoutTypeId: workoutType._id, // נוסיף את זה
    workoutTypeName: workoutType.name,
    performedExercises: [],
    status: 'active',
  });
  

  await workout.save();
  res.json({ id: workout._id });
});

// עדכון תרגילים באימון פתוח (שמירה שוטפת)
router.post('/:id/update', async (req : any, res : any)  => {
  const { id } = req.params;
  const { performedExercises } = req.body;

  const workout = await Workout.findById(id);
  if (!workout) return res.sendStatus(404);

  workout.performedExercises = performedExercises;
  await workout.save();

  res.sendStatus(200);
});

// סיום אימון - שינוי סטטוס ל-completed בלבד
router.post('/:id/complete', async (req : any, res : any) => {
  const { id } = req.params;

  const workout = await Workout.findById(id);
  if (!workout) return res.sendStatus(404);

  workout.status = 'completed';
  await workout.save();

  res.sendStatus(200);
});

// היסטוריית אימונים
router.get('/history', async (_req, res) => {
  const history = await Workout.find().sort({ date: -1 });
  res.json(history);
});

// מחיקת אימון
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Workout.findByIdAndDelete(id);
  res.sendStatus(200);
});

// שליפת אימון פתוח
router.get('/active', async (req : any, res : any)  => {
  const activeWorkout = await Workout.findOne({ status: 'active' });
  if (!activeWorkout) return res.sendStatus(204);
  res.json(activeWorkout);
});

export default router;
