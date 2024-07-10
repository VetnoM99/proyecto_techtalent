
import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import FooterBar from './components/FooterBar';
import { BrowserRouter as  Routes, Route, Link } from 'react-router-dom';
import Login from './Login.tsx';




const App: React.FC = () => {
  return (
    <div className="app-container">
      <NavBar />
      <div className="content">
      <main>
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
          <Link to="/login">
            <button>Ir a Login</button>
          </Link>
        </main>
      </div>
      <FooterBar />
    </div>
    
    
  );
};

export default App;
