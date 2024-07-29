import React, { useEffect } from 'react';
import '../styles/ParticipateSection.css'; 

// Importar las imágenes correctamente
import gainPointsImage from '../assets/imagen1.jpg';
import becomeDonorImage from '../assets/imagen2.jpg';
import getInvolvedImage from '../assets/imagen3.jpg';

const images = {
    gainPoints: gainPointsImage,
    becomeDonor: becomeDonorImage,
    getInvolved: getInvolvedImage,
};

const ParticipateSection: React.FC = () => {
    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('.section-title, .section-intro, .section-with-image, .section-inner-content, .section-image');
            
            sections.forEach((section) => {
                const sectionTop = (section as HTMLElement).getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (sectionTop < windowHeight * 0.8) { 
                    section.classList.add('visible');
                } else {
                    section.classList.remove('visible');
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Trigger once on initial load
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="participate-section">
            <h3 className="section-title">Participa y ayuda</h3>
            <div className="section-content">
                <p className="section-intro">En PortNet, estamos comprometidos con la protección de nuestros océanos y la vida marina. A través de nuestro programa, puedes convertir tus puntos en donaciones directas a ONG dedicadas a combatir la contaminación marina y la pesca no sostenible. ¡Juntos podemos hacer una gran diferencia!</p>

                <div className="how-to-participate">
                    <div className="section-with-image">
                        <div className="section-image-container">
                            <img src={images.gainPoints} alt="Gana Puntos" className="section-image" />
                        </div>
                        <div className="section-content">
                            <h3>Gana puntos</h3>
                            <div className="section-inner-content">
                                <p>Compra productos sostenibles: Cada compra que realizas en nuestra tienda suma puntos a tu cuenta.</p>
                                <p>Participa en eventos: Únete a nuestros eventos y campañas, y gana puntos adicionales.</p>
                                <p>Recicla y reporta: Envía tus reciclables a nuestros centros de recolección y gana puntos al reportar tus actividades de limpieza.</p>
                            </div>
                        </div>
                    </div>

                    <div className="section-with-image">
                        <div className="section-image-container">
                            <img src={images.becomeDonor} alt="Conviértete en Donador" className="section-image" />
                        </div>
                        <div className="section-content">
                            <h3>Conviértete en donador</h3>
                            <div className="section-inner-content">
                                <p>Transforma tus puntos: Una vez que hayas acumulado puntos, puedes convertirlos en donaciones monetarias para las ONG de tu elección.</p>
                                <p>Elige la ONG: Selecciona entre una lista de organizaciones dedicadas a la conservación marina y la lucha contra la pesca ilegal.</p>
                            </div>
                        </div>
                    </div>

                    <div className="section-with-image">
                        <div className="section-image-container">
                            <img src={images.getInvolved} alt="Involúcrate Más Allá de los Puntos" className="section-image" />
                        </div>
                        <div className="section-content">
                            <h3>Involúcrate más allá de los puntos</h3>
                            <div className="section-inner-content">
                                <p>Voluntariado: Únete a nuestras iniciativas de voluntariado para limpiar playas y proteger la vida marina.</p>
                                <p>Difunde el mensaje: Comparte nuestra misión y actividades en tus redes sociales para crear conciencia y atraer más colaboradores.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Otras secciones como ONGs, historias de éxito, preguntas frecuentes, etc. */}
            </div>
        </div>
    );
};

export default ParticipateSection;
