import React from 'react';
import { Container, Typography, Box } from '@mui/material';

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
                        <li>Proyecto de Restauración de Arrecifes 🌾🌰</li>
                        <li>Limpieza en Playas y recogida de plásticos 🍼📦</li>
                        <li>Investigación sobre el Cambio Climático ♻🆙</li>
                    </ul>
                </Box>
            </Box>
        </Container>
    );
};

export default Proyecto;