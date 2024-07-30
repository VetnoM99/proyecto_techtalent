import React from 'react';
import { Container, Typography, Box, Link, Button } from '@mui/material';
import Poject1 from '../assets/CORAL RESTORATION FOUNDATION.png';
import Poject2 from '../assets/MARINE CONSERVATION INSTITUTE .png';
import Poject3 from '../assets/PROJECT AWARE.png';
import Poject4 from '../assets/SEA SHEPSHERD CONSERVATION SOCIETY.png';
import Corals from '../assets/corales.jpg';
import Aware from '../assets/aware 1.jpg';
import Shepherd from '../assets/shepherd.jpg';
import Marine from '../assets/marine conservation.png';

import '../styles/Proyecto.css';

const Proyecto: React.FC = () => {
    return (
        <Container>
            <Box my={4} textAlign="center">
                <Typography variant="h2" component="h1" gutterBottom>
                    Proyecto R.A.C.L.I.
                </Typography>
            </Box>
            <Box my={2}>
                <ul style={{ listStyleType: 'none', padding: 0, textAlign: 'center' }}>
                    <li style={{ margin: '10px 0' }}>Restauración de arrecifes 🌾 🌰</li>
                    <li style={{ margin: '10px 0' }}>Ayuda al seguimiento y cuidado de especies protegidas 🐋 🐟</li>
                    <li style={{ margin: '10px 0' }}>Control riguroso contra las pescas de arrastre ⛴ ⚡</li>
                    <li style={{ margin: '10px 0' }}>Limpieza en Playas y recogida de plásticos en el mar 🍼 📦 </li>
                    <li style={{ margin: '10px 0' }}>Investigación sobre el cambio climático ♻ 🆙 </li>
                </ul>
            </Box>
            <Box display="flex" justifyContent="center" flexWrap="wrap">
                {/* Imagen 1 */}
                <Box className="image-container">
                    <img src={Poject1} alt="Proyecto 1" className="main-image"/>
                    <img src={Corals} alt="Corals" className="hover-image"/>
                    <Box className="overlay">
                        <Link href="https://www.coralfoundation.org" target="_blank" rel="noopener">
                            Visitar web
                        </Link>
                    </Box>
                </Box>
                {/* Imagen 2 */}
                <Box className="image-container">
                    <img src={Poject2} alt="Proyecto 2" className="main-image"/>
                    <img src={Marine} alt="Marine" className="hover-image"/>
                    <Box className="overlay">
                        <Link href="https://www.marine-conservation.org" target="_blank" rel="noopener">
                            Visitar web
                        </Link>
                    </Box>
                </Box>
                {/* Imagen 3 */}
                <Box className="image-container">
                    <img src={Poject3} alt="Proyecto 3" className="main-image"/>
                    <img src={Aware} alt="Aware" className="hover-image"/>
                    <Box className="overlay">
                        <Link href="https://www.projectaware.org" target="_blank" rel="noopener">
                            Visitar web
                        </Link>
                    </Box>
                </Box>
                {/* Imagen 4 */}
                <Box className="image-container">
                    <img src={Poject4} alt="Proyecto 4" className="main-image"/>
                    <img src={Shepherd} alt="Shepherd" className="hover-image"/>
                    <Box className="overlay">
                        <Link href="https://www.seashepherd.org" target="_blank" rel="noopener">
                            Visitar web
                        </Link>
                    </Box>
                </Box>
                {/* Imágenes en fila */}
                <Box display="flex" justifyContent="center" alignItems="center" my={4}>
                    <Box mx={0.5}>
                        <img src={Image1} alt="Imagen 1" style={{ width: '100%', maxWidth: '300px' }}/>
                    </Box>
                    <Box mx={0.5}>
                        <img src={Image2} alt="Imagen 2" style={{ width: '100%', maxWidth: '300px' }}/>
                    </Box>
                    <Box mx={0.5}>
                        <img src={Image3} alt="Imagen 3" style={{ width: '100%', maxWidth: '300px' }}/>
                    </Box>
                </Box>
                {/* Texto sobre nosotros con la imagen de Shepherd al lado */}
                <Box my={4} display="flex" alignItems="flex-start" flexWrap="wrap">
                    <Box flex="1" mr={2}>
                        <Typography variant="h4" component="h2" gutterBottom style={{ fontSize: '2rem' }}>
                            ¿Cuál es nuestro proyecto?
                        </Typography>
                        <Typography variant="body1" paragraph style={{ fontSize: '1.25rem' }}>
                            PortNet es una iniciativa innovadora que une a empresarios y clientes para proteger y conservar los océanos. Los empresarios donan un porcentaje de cada venta a ONG que limpian playas, restauran arrecifes y conservan el entorno marino. Esta colaboración ha permitido retirar 15 toneladas de plásticos en la Costa Dorada y sus alrededores en el último año. PortNet busca expandir esta estrategia a toda la Península, Baleares y Canarias, con el objetivo de lograr un libre de basura en el futuro.
                        </Typography>
                        <Box mt={2}>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                href="https://ethic.es/2020/06/mapamundi-de-la-basura-marina/" 
                                target="_blank" 
                                rel="noopener"
                            >
                                Áreas de Contaminación Global
                            </Button>
                        </Box>
                    </Box>
                    <Box flex="0 0 auto" maxWidth="300px">
                        <img src={Image4} alt="Shepherd" style={{ width: '100%', height: 'auto', borderRadius: '8px' }} />
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default Proyecto;
