import mongoose from 'mongoose';

const ExerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const WorkoutTypeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  exercises: [ExerciseSchema],
});

export default mongoose.model('WorkoutType', WorkoutTypeSchema);
