import React, { useEffect, useState } from 'react';
import { getWorkoutHistory, deleteWorkout } from '../../service/trainingService';
import './style.css';

interface Exercise {
  _id?: string;
  name: string;
}

interface Workout {
  _id: string;
  date: string;
  workoutTypeName: string;
  performedExercises: Exercise[];
}

const WorkoutHistory: React.FC = () => {
  const [history, setHistory] = useState<Workout[]>([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const data = await getWorkoutHistory();
    setHistory(data);
  };

  const handleDelete = async (id: string) => {
    await deleteWorkout(id);
    loadHistory();
  };

  return (
    <div className="workout-history">
      <h2>היסטוריית אימונים</h2>
      {history.map((w) => (
        <div key={w._id} className="workout-entry">
          <div className="entry-header">
            <div>
              <div className="workout-date">{new Date(w.date).toLocaleDateString()}</div>
              <div className="workout-type">{w.workoutTypeName}</div>
            </div>
            <button className="delete-btn" onClick={() => handleDelete(w._id)}>🗑️</button>
          </div>
          <ul>
            {w.performedExercises.map((ex, idx) => (
              <li key={idx}>{ex.name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default WorkoutHistory;
