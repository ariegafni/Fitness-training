import React, { useEffect, useState } from 'react';
import {
  getWorkoutTypes,
  getExercisesByWorkoutType,
  WorkoutType,
  Exercise,
} from '../../service/trainingService';
import './style.css';

const WorkoutTypeList: React.FC<{ onCreateNew: () => void }> = ({ onCreateNew }) => {
  const [workoutTypes, setWorkoutTypes] = useState<WorkoutType[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [exercises, setExercises] = useState<Record<string, Exercise[]>>({});

  useEffect(() => {
    loadWorkoutTypes();
  }, []);

  const loadWorkoutTypes = async () => {
    const types = await getWorkoutTypes();
    setWorkoutTypes(types);
  };

  const toggleExpand = async (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
      return;
    }
    if (!exercises[id]) {
      const data = await getExercisesByWorkoutType(id);
      setExercises((prev) => ({ ...prev, [id]: data }));
    }
    setExpandedId(id);
  };

  return (
    <div className="workout-type-list">
      <h2>סוגי אימון</h2>
      <button onClick={onCreateNew}>צור סוג חדש</button>
      <ul>
        {workoutTypes.map((type) => (
          <li key={type._id}>
            <div className="workout-type-header" onClick={() => toggleExpand(type._id)}>
              {type.name}
            </div>
            {expandedId === type._id && (
              <ul className="exercise-list">
                {exercises[type._id]?.map((ex) => (
                  <li key={ex._id}>{ex.name}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkoutTypeList;
