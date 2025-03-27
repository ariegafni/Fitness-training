import express from 'express';
import WorkoutType from '../models/WorkoutType';

const router = express.Router();

// יצירת סוג אימון
router.post('/', async (req, res) => {
  const { name } = req.body;
  const workout = new WorkoutType({ name, exercises: [] });
  await workout.save();
  res.sendStatus(201);
});

// שליפת כל סוגי האימון
router.get('/', async (_req, res) => {
  const types = await WorkoutType.find();
  res.json(types);
});

// הוספת תרגיל לסוג אימון
router.post('/:id/exercises', async (req : any, res : any) => {
  const { id } = req.params;
  const { name } = req.body;
  const workout = await WorkoutType.findById(id);
  if (!workout) return res.sendStatus(404);
  workout.exercises.push({ name });
  await workout.save();
  res.sendStatus(200);
});

// שליפת תרגילים לסוג אימון
router.get('/:id/exercises', async  (req : any, res : any)  => {
  const { id } = req.params;
  const workout = await WorkoutType.findById(id);
  if (!workout) return res.sendStatus(404);
  res.json(workout.exercises);
});

// מחיקת תרגיל מסוים מסוג אימון
router.delete('/:id/exercises/:exerciseId', async (req : any, res : any) => {
  const { id, exerciseId } = req.params;
  const workout = await WorkoutType.findById(id);
  if (!workout) return res.sendStatus(404);

  workout.set('exercises', workout.exercises.filter(
    (ex: any) => ex._id.toString() !== exerciseId
  ));
  await workout.save();
  res.sendStatus(204);
});



export default router;
