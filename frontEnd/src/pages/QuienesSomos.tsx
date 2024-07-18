import React, { useState } from 'react';
import { Container, Typography, Box, Card, CardContent} from '@mui/material';
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import '../styles/QuienesSomos.css'; // Importa tus estilos

import Basura2 from '../assets/basura-2.jpeg';
import Basura1 from '../assets/basura-1.jpg';
import Basura3 from '../assets/basura-3.jpg';
import Basura4 from '../assets/bassura-4.jpg';
import Colaborar from '../assets/colaborar.jpg';
import Aporte from '../assets/aporte.jpg';
import Playa from '../assets/playa.jpg';

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

interface CustomGalleryItem extends ReactImageGalleryItem {
    hoverImage: string;
    link: string;
}

const QuienesSomos: React.FC = () => {
    const [hoveredRestaurant, setHoveredRestaurant] = useState<string | null>(null);
    const [carouselPaused, setCarouselPaused] = useState<boolean>(false);

    const images: ReactImageGalleryItem[] = [
        {
            original: Basura1,
            thumbnail: Basura1,
            description: 'Ayuda',
        },
        {
            original: Basura2,
            thumbnail: Basura2,
            description: 'Te necesitamos',
        },
        {
            original: Basura3,
            thumbnail: Basura3,
            description: 'Las playas te necesitan',
        },
        {
            original: Basura4,
            thumbnail: Basura4,
            description: 'El mundo necesita limpiarse',
        },
        {
            original: Colaborar,
            thumbnail: Colaborar,
            description: 'Colabora con nosotros',
        },
        {
            original: Aporte,
            thumbnail: Aporte,
            description: 'Simplemente con tu recibo de compra',
        },
        {
            original: Playa,
            thumbnail: Playa,
            description: 'Para tener Playas mas limpias',
        },
    ];

    const images2: CustomGalleryItem[] = [
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
        <Container className="container">
            <Box className="header">
                <Typography variant="h2" component="h1" gutterBottom>
                    Quiénes somos
                </Typography>
            </Box>
            <Box className="intro-gallery-container">
                <Box className="intro">
                    <Typography variant="h6" component="p" className="intro-text">
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
                </Box>
                <Box className="gallery">
                    <ImageGallery 
                        items={images} 
                        showThumbnails={false} 
                        autoPlay={true} 
                        slideInterval={5000}
                        slideDuration={400}
                        showNav={false} 
                        showFullscreenButton={false}
                        showPlayButton ={false}
                        renderItem={(item: ReactImageGalleryItem) => (
                            <div className="image-gallery-image">
                                <img 
                                    src={item.original} 
                                    alt={item.description} 
                                    style={{ maxHeight: '270px', objectFit: 'contain', borderRadius: '8px' }} 
                                />
                            </div>
                        )}
                    />
                </Box>
            </Box>
            <Box className="intro">
                <Typography variant="h4" component="h2" gutterBottom>
                    Nuestro objetivo:
                </Typography>
                <Card className="card">
                    <CardContent>
                        <Typography variant="h5" component="h3">
                            Objetivo 2024
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Ante las alarmantes noticias sobre la contaminación plástica en el mar y sus devastadores efectos, en 2024 decidimos actuar. 
                            Así nació el proyecto Port⭕Net, diseñado en consonancia con los Objetivos de Desarrollo Sostenible (ODS). Nuestro objetivo principal es limpiar más de 1000 km² del fondo marino de la Costa Dorada, promoviendo al mismo tiempo prácticas de pesca responsable y sostenible, y dejando atrás métodos destructivos que dañan los ecosistemas a corto y largo plazo.
                        </Typography>
                    </CardContent>
                </Card>
                <Card className="card">
                    <CardContent>
                        <Typography variant="h5" component="h3">
                            Colaboraciones
                        </Typography>
                        <Typography variant="body1" paragraph>
                            Los restaurantes de la zona se han comprometido a donar una parte de cada venta para apoyar a las ONG que se dedican a la recolección de basura marina y la protección de especies. 
                            Estas donaciones ayudarán a cubrir los costos de los equipos de buceo, Zodiacs, barcos, lanchas y otros vehículos necesarios para llevar a cabo estas importantes y complejas tareas.
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
            <Box className="gallery">
                <Typography variant="h4" component="h2" gutterBottom>
                    Restaurantes colaboradores del proyecto:
                </Typography>
                <ImageGallery 
                    items={images2} 
                    showThumbnails={false} 
                    showPlayButton={false} 
                    autoPlay={!carouselPaused} 
                    slideInterval={5000}
                    slideDuration={500}
                    showNav={false} 
                    showFullscreenButton={false} 
                    renderItem={(item: ReactImageGalleryItem) => (
                        <div className="image-gallery-image" style={{ cursor: 'pointer' }}>
                            <img 
                                src={hoveredRestaurant === (item as CustomGalleryItem).hoverImage ? (item as CustomGalleryItem).hoverImage : item.original} 
                                alt={item.description} 
                                style={{ maxHeight: '270px', objectFit: 'contain', borderRadius: '8px' }} 
                                onClick={() => handleImageClick((item as CustomGalleryItem).link)} // Abre el enlace al hacer clic en la imagen
                                onMouseOver={() => handleMouseOver(images2.findIndex(i => i.original === item.original))}
                                onMouseOut={handleMouseOut}
                            />
                        </div>
                    )}
                />
            </Box>
        </Container>
    );
};

export default QuienesSomos;
