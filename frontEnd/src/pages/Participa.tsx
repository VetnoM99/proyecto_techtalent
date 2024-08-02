import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ParticipateSection.css'; // Importar el archivo CSS

// Importar las imágenes
import gainPointsImage from '../assets/imagen1.jpg';
import becomeDonorImage from '../assets/imagen2.jpg';
import getInvolvedImage from '../assets/imagen3.jpg';

const images = {
    gainPoints: gainPointsImage,
    becomeDonor: becomeDonorImage,
    getInvolved: getInvolvedImage,
};

const ParticipateSection: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('.section-title, .section-intro, .section-with-background, .section-inner-content, .section-image');
            
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

    const handleButtonClick = (path: string) => {
        navigate(path);
    };

    return (
        <div className="participate-section">
            <h1 className="section-title">Participa y ayuda</h1>
            <div className="section-content">
                <p className="section-intro">
                    En PortNet, estamos comprometidos con la protección de nuestros océanos y la vida marina. A través de nuestro programa, puedes convertir tus puntos en donaciones directas a ONG dedicadas a combatir la contaminación marina y la pesca no sostenible. ¡Juntos podemos hacer una gran diferencia!
                </p>

                <div className="how-to-participate">
                    <SectionWithBackground title="Gana puntos" image={images.gainPoints}>
                        <div>
                            <p>Participa en eventos: Únete a nuestros eventos y campañas, y gana puntos adicionales.</p>
                            <p>Recicla y reporta: Envía tus reciclables a nuestros centros de recolección y gana puntos al reportar tus actividades de limpieza.</p>
                            <button className="common-button" onClick={() => handleButtonClick('/register')}>
                                Gana puntos
                            </button>
                        </div>
                    </SectionWithBackground>

                    <SectionWithBackground title="Consigue recompensas" image={images.becomeDonor}>
                        <div>
                            <p>Transforma tus puntos: Una vez que hayas acumulado puntos, puedes convertirlos en donaciones monetarias para las ONG de tu elección.</p>
                            <p>Elige la ONG: Selecciona entre una lista de organizaciones dedicadas a la conservación marina y la lucha contra la pesca ilegal.</p>
                            <button className="common-button" onClick={() => handleButtonClick('/tienda')}>
                                Nuestra tienda
                            </button>
                        </div>
                    </SectionWithBackground>

                    <SectionWithBackground title="Involúcrate más allá de los puntos" image={images.getInvolved}>
                        <div>
                            <p>Voluntariado: Únete a nuestras iniciativas de voluntariado para limpiar playas y proteger la vida marina.</p>
                            <p>Difunde el mensaje: Comparte nuestra misión y actividades en tus redes sociales para crear conciencia y atraer más colaboradores.</p>
                            <button className="common-button" onClick={() => handleButtonClick('/proyecto')}>
                                Nuestro proyecto
                            </button>
                        </div>
                    </SectionWithBackground>
                </div>
            </div>
        </div>
    );
};

interface SectionWithBackgroundProps {
    title: string;
    image: string;
    children: React.ReactNode;
}

const SectionWithBackground: React.FC<SectionWithBackgroundProps> = ({ title, image, children }) => {
    return (
        <div className="section-with-background" style={{ backgroundImage: `url(${image})` }}>
            <div className="background-overlay"></div>
            <div className="section-content">
                <h3>{title}</h3>
                <div className="section-inner-content">
                    {children}
                </div>
            </div>
            <img src={image} alt={title} className="section-image" />
        </div>
    );
};

export default ParticipateSection;
