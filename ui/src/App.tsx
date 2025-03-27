import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import WorkoutTypeManager from './components/WorkoutTypeManager';
import WorkoutTypeList from './components/WorkoutTypeList';
import WorkoutSession from './components/WorkoutSession';
import WorkoutHistory from './components/WorkoutHistory';
import './App.css';

const AppLayout: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="app-container">
      <nav className="top-nav">
        <button onClick={() => navigate('/')}>🏋️ סוגי אימון</button>
        <button onClick={() => navigate('/session')}>🔥 אימון</button>
        <button onClick={() => navigate('/history')}>📅 היסטוריה</button>
      </nav>

      <div className="main-content">
        <Routes>
          <Route path="/" element={<WorkoutTypeList onCreateNew={() => navigate('/manage')} />} />
          <Route path="/manage" element={<WorkoutTypeManager />} />
          <Route path="/session" element={<WorkoutSession />} />
          <Route path="/history" element={<WorkoutHistory />} />
        </Routes>
      </div>
    </div>
  );
};


const App: React.FC = () => (
  <Router>
    <AppLayout />
  </Router>
);

export default App;
