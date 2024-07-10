import React from 'react';
import './App.css';
import NavBar from './components/NavBar';
import FooterBar from './components/FooterBar';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <NavBar />
      <div className="content">
        {/* Aquí puedes añadir más contenido si lo necesitas */}
      </div>
      <FooterBar />
    </div>
  );
};

export default App;
