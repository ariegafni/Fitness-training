import React, { useEffect, useState } from 'react';
import {
  getWorkoutTypes,
  getExercisesByWorkoutType,
  startWorkout,
  updateWorkout,
  saveWorkout,
  getActiveWorkout,
  WorkoutType,
  Exercise,
} from '../../service/trainingService';
import './style.css';

const WorkoutSession: React.FC = () => {
  const [workoutTypes, setWorkoutTypes] = useState<WorkoutType[]>([]);
  const [selectedTypeId, setSelectedTypeId] = useState('');
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [workoutId, setWorkoutId] = useState<string | null>(null);
  const [isActiveSession, setIsActiveSession] = useState(false);

  useEffect(() => {
    checkActiveWorkout();
    loadWorkoutTypes();
  }, []);

  const loadWorkoutTypes = async () => {
    const types = await getWorkoutTypes();
    setWorkoutTypes(types);
  };

  const checkActiveWorkout = async () => {
    const active = await getActiveWorkout();
    if (!active) return;
  
    setIsActiveSession(true);
    setWorkoutId(active._id);
    setSelectedTypeId(active.workoutTypeId);
  
    const ex = await getExercisesByWorkoutType(active.workoutTypeId);
    setExercises(ex);
  
    const checkedMap: Record<string, boolean> = {};
    ex.forEach((exercise) => {
      const found = active.performedExercises.find((p) => p.name === exercise.name);
      if (found) {
        checkedMap[exercise._id!] = true;
      }
    });
    setChecked(checkedMap);
  };
  
  

  const handleStart = async () => {
    if (!selectedTypeId) return;
    const ex = await getExercisesByWorkoutType(selectedTypeId);
    setExercises(ex);
    setChecked({});
    const workout = await startWorkout(selectedTypeId);
    setWorkoutId(workout.id);
    setIsActiveSession(true);
  };

  const toggleExercise = (id: string) => {
    const updated = { ...checked, [id]: !checked[id] };
    setChecked(updated);
    if (workoutId) {
      const performed = exercises
        .filter((e) => updated[e._id!])
        .map((e) => ({ name: e.name }));
      updateWorkout(workoutId, performed); // שמירה שוטפת בלבד
    }
  };

  const getProgress = () => {
    const total = exercises.length;
    const done = Object.values(checked).filter(Boolean).length;
    return total ? Math.round((done / total) * 100) : 0;
  };

  const handleFinish = async () => {
    if (workoutId) {
      await saveWorkout(workoutId); // סיום רשמי
    }
    setWorkoutId(null);
    setExercises([]);
    setChecked({});
    setSelectedTypeId('');
    setIsActiveSession(false);
  };

  return (
    <div className="workout-session">
      <h2>אימון חדש</h2>
      {!isActiveSession && (
        <>
          <select value={selectedTypeId} onChange={(e) => setSelectedTypeId(e.target.value)}>
            <option value="">בחר סוג אימון</option>
            {workoutTypes.map((type) => (
              <option key={type._id} value={type._id}>
                {type.name}
              </option>
            ))}
          </select>
          <button onClick={handleStart} disabled={!selectedTypeId}>
            התחל אימון
          </button>
        </>
      )}

      {exercises.length > 0 && (
        <>
          <h3>התקדמות: {getProgress()}%</h3>
          <progress value={getProgress()} max={100} />
          <ul>
            {exercises.map((ex) => (
              <li key={ex._id}>
                <label>
                  <input
                    type="checkbox"
                    checked={!!checked[ex._id!]}
                    onChange={() => toggleExercise(ex._id!)}
                  />
                  {ex.name}
                </label>
              </li>
            ))}
          </ul>
          <button onClick={handleFinish}>סיים אימון</button>
        </>
      )}
    </div>
  );
};

export default WorkoutSession;
