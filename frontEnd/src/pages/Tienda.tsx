import React, { useState } from 'react';
import '../styles/Tienda.css';
const Tienda: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const images = [
        { src: "../assets/5.jpg", description: 'Descuento del 5% en tu próximo ticket' },
        { src: '../assets/10.jpg', description: 'Descuento del 10% en tu próximo ticket' },
        { src: '../assets/15.jpg', description: 'Descuento del 15% en tu próximo ticket' },
        { src: '../assets/20.jpg', description: 'Descuento del 20% en tu próximo ticket' },
        { src: '../assets/2.jpg', description: 'Obtén un x2 en tu próximo ticket' },
    ];

    const handleButtonClick = () => {
        const randomIndex = Math.floor(Math.random() * images.length);
        setSelectedImage(images[randomIndex].src);
    };

    return (
        <div className="tienda">
            <h1>Canjea tus puntos en nuestra tienda</h1>
            <div className="frases">
                <p>⭐Gracias a los puntos que has conseguido, podrás obtener premios para que vuelvas a contribuir a una buena causa.⭐</p>
                <p>Canjea una vez </p>
            </div>
            <div className="imagenes">
                {images.map((image, index) => (
                    <div key={index} className="imagen-container">
                        <img src={image.src} alt={image.description} />
                        <p>{image.description}</p>
                    </div>
                ))}
            </div>
            <button onClick={handleButtonClick}>Probar suerte con 100 puntos</button>
            {selectedImage && <p>Imagen seleccionada: <img src={selectedImage} alt="Imagen seleccionada" /></p>}
        </div>
    );
};

export default Tienda;
