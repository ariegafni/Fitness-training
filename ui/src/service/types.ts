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
    date: string;
    workoutTypeName: string;
    performedExercises: Exercise[];
  }
  