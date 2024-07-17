import React, { useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

import PuertoImage from '../assets/Puerto 0.jpg';
import PulpoImage from '../assets/Pulpo 2.jpg';
import PaellaImage from '../assets/Paella OK .jpg';
import TicketImage from '../assets/Ticket1.jpg';
import AppImage from '../assets/App.jpg';

import Montserrat from '../assets/RESTAURANT MONTSERRAT PEIX I MARISC.png';
import Indret from '../assets/RESTAURANT & LOUNGE LINDRET.png';
import Kema from '../assets/RESTAURANT BRASAS & COCKTAIL KEMA.png';
import Posit from '../assets/RESTAURANT EL PÒSIT.png';
import Roce from '../assets/ARROCERÍA ROCE.png';
import Montserrat2 from '../assets/hover-RESTAURANT MONTSERRAT PEIX I MARISC.png';
import Indret2 from '../assets/hover-RESTAURANT & LOUNGE LINDRET.png';
import Kema2 from '../assets/hover-RESTAURANT BRASAS & COCKTAIL KEMA.png';
import Posit2 from '../assets/hover-RESTAURANT EL PÒSIT.png';
import Roce2 from '../assets/hover-ARROCERÍA ROCE.png';

interface GalleryItem extends ReactImageGalleryItem {
    hoverImage: string;
    link: string;
}

const QuienesSomos: React.FC = () => {
    const [hoveredRestaurant, setHoveredRestaurant] = useState<string | null>(null);
    const [carouselPaused, setCarouselPaused] = useState<boolean>(false);

    const images: ReactImageGalleryItem[] = [
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

    const images2: GalleryItem[] = [
        {
            original: Montserrat,
            thumbnail: Montserrat,
            description: 'Montserrat',
            hoverImage: Montserrat2,
            link: 'https://www.restaurantmontserrat.com/'
        },
        {
            original: Kema,
            thumbnail: Kema,
            description: 'Kema',
            hoverImage: Kema2,
            link: 'https://kemacambrils.com/'
        },
        {
            original: Roce,
            thumbnail: Roce,
            description: 'Roce',
            hoverImage: Roce2,
            link: 'https://micuerpopideroce.com/'
        },
        {
            original: Posit,
            thumbnail: Posit,
            description: 'Posit',
            hoverImage: Posit2,
            link: 'https://www.elposit.com/es/restaurantes/el-posit-de-cambrils'
        },
        {
            original: Indret,
            thumbnail: Indret,
            description: 'Indret',
            hoverImage: Indret2,
            link: 'https://www.lindretdecambrils.com/'
        },
    ];

    const handleMouseOver = (index: number) => {
        setHoveredRestaurant(images2[index].hoverImage);
        setCarouselPaused(true);
    };

    const handleMouseOut = () => {
        setHoveredRestaurant(null);
        setCarouselPaused(false);
    };

    const handleImageClick = (url: string) => {
        window.open(url, '_blank'); // Abrir enlace en una nueva pestaña
    };

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
                        autoPlay={true} 
                        slideInterval={5000}
                        slideDuration={500}
                        showNav={false} 
                        renderItem={(item) => (
                            <div className="image-gallery-image">
                                <img 
                                    src={item.original} 
                                    alt={item.description} 
                                    style={{ maxHeight: '270px', objectFit: 'contain',  }} 
                                />
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
                <Box my={4} maxWidth="80%" margin="0 auto">
                    <ImageGallery 
                        items={images2} 
                        showThumbnails={false} 
                        showPlayButton={false} 
                        autoPlay={!carouselPaused} 
                        slideInterval={5000}
                        slideDuration={500}
                        showNav={false} 
                        showFullscreenButton={false} 
                        onMouseOver={(event, index) => handleMouseOver(index as number)} 
                        onMouseLeave={handleMouseOut}
                        renderItem={(item: GalleryItem) => (
                            <div className="image-gallery-image" style={{ cursor: 'pointer' }}>
                                <img 
                                    src={hoveredRestaurant === item.hoverImage ? item.hoverImage : item.original} 
                                    alt={item.description} 
                                    style={{ maxHeight: '270px', objectFit: 'contain', borderRadius: '8px' }} 
                                    onClick={() => handleImageClick(item.link)} // Abre el enlace al hacer clic en la imagen
                                />
                            </div>
                        )}
                    />
                </Box>
            </Box>
        </Container>
    );
};

export default QuienesSomos;
