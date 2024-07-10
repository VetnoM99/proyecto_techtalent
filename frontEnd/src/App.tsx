import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './Login.tsx';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Bienvenido a mi Aplicación</h1>
        </header>
        <main>
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
          <Link to="/login">
            <button>Ir a Login</button>
          </Link>
        </main>
      </div>
    </Router>
  );
};

export default App;
