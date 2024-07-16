import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

import PuertoImage from '../assets/Puerto 0.jpg';
import PulpoImage from '../assets/Pulpo 2.jpg';
import PaellaImage from '../assets/Paella OK .jpg';
import TicketImage from '../assets/Ticket1.jpg';
import AppImage from '../assets/App.jpg';

const QuienesSomos: React.FC = () => {
    const images = [
        {
            original: PuertoImage,
            thumbnail: PuertoImage,
            description: 'Ocean',
        },
        {
            original: PulpoImage,
            thumbnail: PulpoImage,
            description: 'Pulpo',
        },
        {
            original: PaellaImage,
            thumbnail: PaellaImage,
            description: 'Paella',
        },
        {
            original: TicketImage,
            thumbnail: TicketImage,
            description: 'Ticket',
        },
        {
            original: AppImage,
            thumbnail: AppImage,
            description: 'App',
        },
    ];

    return (
        <Container>
            <Box my={4} textAlign="center">
                <Typography variant="h2" component="h1" gutterBottom>
                    Quiénes somos
                </Typography>
                <Typography variant="body1" paragraph>
                    "Del mar a tu mesa". Nos comprometemos a ofrecer productos de la más alta calidad mientras protegemos nuestras costas.
                    Con el proyecto 'Port⭕Net', lideramos la lucha contra el plástico y las prácticas insostenibles.
                </Typography>
                <Typography variant="body1" paragraph>
                    Con cada ticket de compra que el cliente haga en uno de nuestros restaurantes/socios, aportará una pequeña cantidad a 
                    la causa. Sin tener que pagar extras y con un mínimo porcentaje que la empresa no resentirá en sus ingresos. Así podremos
                    aportar todos directamente. 
                </Typography>
                <Typography variant="body1" paragraph>
                    Tú mismo desde la App podrás donar los puntos a la ONG que prefieras. En el caso de que no
                    dispongas del tiempo para poderlo hacer, no te preocupes. Cada seis meses hacemos recuento de los votos perdidos y se
                    repartirán de manera equitativa entre todas las ONG.
                </Typography>
                <Box my={4} maxWidth="80%" margin="0 auto">
                    <ImageGallery 
                        items={images} 
                        showThumbnails={false} 
                        showPlayButton={false} 
                        autoPlay={true} 
                        slideInterval={5000} // Intervalo en milisegundos (5 segundos)
                        slideDuration={500} // Duración de la transición en milisegundos
                        showNav={false} // Ocultar las flechas de navegación
                        showFullscreenButton={false} // Ocultar botón de pantalla completa
                        renderItem={(item) => (
                            <div className="image-gallery-image">
                                <img src={item.original} alt={item.description} style={{ maxHeight: '270px', objectFit: 'contain' }} />
                            </div>
                        )}
                    />
                </Box>
                <Typography variant="h5" component="h1" gutterBottom>
                    Nuestro objetivo:
                </Typography>
                <Typography variant="body1" paragraph>
                    Ante las alarmantes noticias sobre la contaminación plástica en el mar y sus devastadores efectos, en 2024 decidimos actuar. 
                    Así nació el proyecto Port⭕Net, diseñado en consonancia con los Objetivos de Desarrollo Sostenible (ODS). Nuestro objetivo principal es limpiar más de 1000 km² del fondo marino de la Costa Dorada, promoviendo al mismo tiempo prácticas de pesca responsable y sostenible, y dejando atrás métodos destructivos que dañan los ecosistemas a corto y largo plazo.
                    Los restaurantes de la zona se han comprometido a donar una parte de cada venta para apoyar a las ONG que se dedican a la recolección de basura marina y la protección de especies. 
                    Estas donaciones ayudarán a cubrir los costos de los equipos de buceo, Zodiacs, barcos, lanchas y otros vehículos necesarios para llevar a cabo estas importantes y complejas tareas.
                </Typography>
                <Typography variant="h5" component="h1" gutterBottom>
                    Restaurantes colaboradores del proyecto:
                </Typography>
            </Box>
        </Container>
    );
};

export default QuienesSomos;
