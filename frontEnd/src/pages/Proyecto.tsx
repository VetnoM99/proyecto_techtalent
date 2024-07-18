import React from 'react';
import { Container, Typography, Box, Link } from '@mui/material';
import Poject1 from '../assets/CORAL RESTORATION FOUNDATION.png';
import Poject2 from '../assets/MARINE CONSERVATION INSTITUTE .png';
import Poject3 from '../assets/PROJECT AWARE.png';
import Poject4 from '../assets/SEA SHEPSHERD CONSERVATION SOCIETY.png';

// Estilos para el efecto de difuminado
import '../styles/Proyecto.css'; // Asegúrate de tener un archivo Proyecto.css o usar estilos en línea

const Proyecto: React.FC = () => {
    return (
        <Container>
            <Box my={4}>
                <Typography variant="h2" component="h1" gutterBottom>
                    Proyecto
                </Typography>
                <Box my={2}>
                    <Typography variant="h6" component="h2" gutterBottom>
                        Lista de Actividades
                    </Typography>
                    <ul>
                        <li>Proyecto de restauración de arrecifes 🌾 🌰</li>
                        <li>Limpieza en playas y recogida de plásticos 🍼 📦</li>
                        <li>Investigación sobre el cambio climático ♻ 🆙</li>
                    </ul>
                </Box>
                <Box display="flex" justifyContent="space-between" flexWrap="wrap">
                    {/* Imagen 1 */}
                    <Box className="image-container">
                        <img src={Poject1} alt="Proyecto 1" />
                        <Box className="overlay">
                            <Link href="https://www.coralfoundation.org" target="_blank" rel="noopener">
                                Visitar web
                            </Link>
                        </Box>
                    </Box>
                    {/* Imagen 2 */}
                    <Box className="image-container">
                        <img src={Poject2} alt="Proyecto 2" />
                        <Box className="overlay">
                            <Link href="https://www.marine-conservation.org" target="_blank" rel="noopener">
                                Visitar web
                            </Link>
                        </Box>
                    </Box>
                    {/* Imagen 3 */}
                    <Box className="image-container">
                        <img src={Poject3} alt="Proyecto 3" />
                        <Box className="overlay">
                            <Link href="https://www.projectaware.org" target="_blank" rel="noopener">
                                Visitar web
                            </Link>
                        </Box>
                    </Box>
                    {/* Imagen 4 */}
                    <Box className="image-container">
                        <img src={Poject4} alt="Proyecto 4" />
                        <Box className="overlay">
                            <Link href="https://www.seashepherd.org" target="_blank" rel="noopener">
                                Visitar web
                            </Link>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default Proyecto;
