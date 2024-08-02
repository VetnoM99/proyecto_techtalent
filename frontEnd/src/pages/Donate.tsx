// src/components/UploadAndDonate.tsx

import React, { useState, useEffect } from 'react';
import '../styles/Donate.css'; // Importa el archivo CSS

const UploadAndDonate: React.FC = () => {
  // Estado para manejar el registro del usuario
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [points, setPoints] = useState<number>(0);
  const [showPopup, setShowPopup] = useState<boolean>(!isRegistered);

  useEffect(() => {
    // Muestra el popup si no está registrado al cargar la página
    setShowPopup(!isRegistered);
  }, [isRegistered]);

  const handleDonatePointsClick = () => {
    if (isRegistered) {
      setPoints(prevPoints => prevPoints + 10); // Incrementar en 10 puntos por donación
    }
  };

  const handleDonateMoneyClick = () => {
    if (isRegistered) {
      // Aquí podrías manejar la donación de dinero
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="container">
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>¡Atención!</h2>
            <p>Por favor, regístrate o inicia sesión para acceder a las funciones de donación.</p>
          </div>
        </div>
      )}

      <h1>Dona</h1>
      <h2>Sube tu foto y gana puntos</h2>
      
      <div className="points-section">
        <button
          onClick={handleDonatePointsClick}
          disabled={!isRegistered} // Deshabilitado si no está registrado
        >
          Donar puntos
        </button>
        <p className="points-info">Puntos obtenidos: {points}</p>
      </div>

      <div className="donate-section">
        <h2>Haz una donación</h2>
        <button
          onClick={handleDonateMoneyClick}
          disabled={!isRegistered} // Deshabilitado si no está registrado
        >
          Donar dinero
        </button>
      </div>
    </div>
  );
};

export default UploadAndDonate;
