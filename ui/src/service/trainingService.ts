import BASE_URL from './config';

export interface WorkoutType {
  _id: string;
  name: string;
  exercises?: Exercise[];
}

export interface Exercise {
  _id?: string;
  name: string;
}

export interface Workout {
  _id: string;
  workoutTypeId: string; // ⬅️ הוסף את זה
  workoutTypeName: string;
  date: string;
  performedExercises: Exercise[];
  status: 'active' | 'completed';
}


// ===== Workout Types =====

export const createWorkoutType = async (name: string): Promise<void> => {
  await fetch(`${BASE_URL}/workout-types`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });
};
export const getActiveWorkout = async (): Promise<Workout | null> => {
  const res = await fetch(`${BASE_URL}/workouts/active`);
  if (res.status === 204) return null;
  return await res.json();
};


export const getWorkoutTypes = async (): Promise<WorkoutType[]> => {
  const res = await fetch(`${BASE_URL}/workout-types`);
  return await res.json();
};

export const deleteWorkoutType = async (id: string): Promise<void> => {
  await fetch(`${BASE_URL}/workout-types/${id}`, {
    method: 'DELETE',
  });
};

export const addExerciseToWorkoutType = async (
  workoutTypeId: string,
  exerciseName: string
): Promise<void> => {
  await fetch(`${BASE_URL}/workout-types/${workoutTypeId}/exercises`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: exerciseName }),
  });
};

export const getExercisesByWorkoutType = async (
  workoutTypeId: string
): Promise<Exercise[]> => {
  const res = await fetch(`${BASE_URL}/workout-types/${workoutTypeId}/exercises`);
  return await res.json();
};

export const deleteExerciseFromWorkoutType = async (
  workoutTypeId: string,
  exerciseId: string
): Promise<void> => {
  await fetch(`${BASE_URL}/workout-types/${workoutTypeId}/exercises/${exerciseId}`, {
    method: 'DELETE',
  });
};

// ===== Workout Sessions =====

export const startWorkout = async (
  workoutTypeId: string
): Promise<{ id: string }> => {
  const res = await fetch(`${BASE_URL}/workouts/start`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ workoutTypeId }),
  });
  return await res.json();
};

export const saveWorkout = async (workoutId: string): Promise<void> => {
  await fetch(`${BASE_URL}/workouts/${workoutId}/complete`, {
    method: 'POST',
  });
};


export const getWorkoutHistory = async (): Promise<Workout[]> => {
  const res = await fetch(`${BASE_URL}/workouts/history`);
  return await res.json();
};

export const deleteWorkout = async (id: string): Promise<void> => {
  await fetch(`${BASE_URL}/workouts/${id}`, {
    method: 'DELETE',
  });
};
export const updateWorkout = async (
  workoutId: string,
  performedExercises: Exercise[]
): Promise<void> => {
  await fetch(`${BASE_URL}/workouts/${workoutId}/update`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ performedExercises }),
  });
};

