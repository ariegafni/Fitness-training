import mongoose from 'mongoose';

const PerformedExerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const WorkoutSchema = new mongoose.Schema({
  workoutTypeId: { type: mongoose.Schema.Types.ObjectId, ref: 'WorkoutType', required: true },
  workoutTypeName: { type: String, required: true },
  performedExercises: [PerformedExerciseSchema],
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ['active', 'completed'], default: 'active' },
});

export default mongoose.model('Workout', WorkoutSchema);
