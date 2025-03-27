import React, { useState, useEffect } from 'react';
import {
  createWorkoutType,
  addExerciseToWorkoutType,
  getWorkoutTypes,
  getExercisesByWorkoutType,
  deleteExerciseFromWorkoutType,
  WorkoutType,
  Exercise,
} from '../../service/trainingService';
import './style.css';

const WorkoutTypeManager: React.FC = () => {
  const [workoutName, setWorkoutName] = useState('');
  const [selectedWorkoutId, setSelectedWorkoutId] = useState('');
  const [exerciseName, setExerciseName] = useState('');
  const [workoutTypes, setWorkoutTypes] = useState<WorkoutType[]>([]);
  const [exercises, setExercises] = useState<Exercise[]>([]);

  useEffect(() => {
    loadWorkoutTypes();
  }, []);

  useEffect(() => {
    if (selectedWorkoutId) loadExercises();
    else setExercises([]);
  }, [selectedWorkoutId]);

  const loadWorkoutTypes = async () => {
    const data = await getWorkoutTypes();
    setWorkoutTypes(data);
  };

  const loadExercises = async () => {
    const data = await getExercisesByWorkoutType(selectedWorkoutId);
    setExercises(data);
  };

  const handleCreateWorkoutType = async () => {
    if (!workoutName) return;
    await createWorkoutType(workoutName);
    setWorkoutName('');
    loadWorkoutTypes();
  };

  const handleAddExercise = async () => {
    if (!exerciseName || !selectedWorkoutId) return;
    await addExerciseToWorkoutType(selectedWorkoutId, exerciseName);
    setExerciseName('');
    loadExercises();
  };

  const handleDeleteExercise = async (exerciseId: string) => {
    if (!selectedWorkoutId) return;
    await deleteExerciseFromWorkoutType(selectedWorkoutId, exerciseId);
    loadExercises();
  };

  return (
    <div className="workout-type-manager">
      <h2>יצירת סוג אימון</h2>
      <input
        type="text"
        placeholder="שם סוג האימון"
        value={workoutName}
        onChange={(e) => setWorkoutName(e.target.value)}
      />
      <button onClick={handleCreateWorkoutType}>צור</button>

      <h2>בחר סוג אימון</h2>
      <select onChange={(e) => setSelectedWorkoutId(e.target.value)} value={selectedWorkoutId}>
        <option value="">בחר...</option>
        {workoutTypes.map((w) => (
          <option key={w._id} value={w._id}>
            {w.name}
          </option>
        ))}
      </select>

      {selectedWorkoutId && (
        <>
          <h3>הוספת תרגיל</h3>
          <input
            type="text"
            placeholder="שם התרגיל"
            value={exerciseName}
            onChange={(e) => setExerciseName(e.target.value)}
          />
          <button onClick={handleAddExercise}>הוסף</button>

          <h3>רשימת תרגילים</h3>
          <ul>
            {exercises.map((ex) => (
              <li key={ex._id}>
                {ex.name}
                <button onClick={() => handleDeleteExercise(ex._id!)}>🗑️</button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default WorkoutTypeManager;
