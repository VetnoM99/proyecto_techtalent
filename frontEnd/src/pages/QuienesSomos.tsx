import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import PuertoImage from '../assets/Puerto 0.jpg';

const QuienesSomos: React.FC = () => {
    return (
        <Container>
            <Box my={4}>
                <Typography variant="h2" component="h1" gutterBottom>
                    Quiénes Somos
                </Typography>
                <Typography variant="body1">
                    Del mar a tu mesa. Nos comprometemos a ofrecer productos de la más alta calidad mientras protegemos nuestros océanos.
                    Con el proyecto 'Port⭕Net', lideramos la lucha contra el plástico y las prácticas insostenibles.
                </Typography>
                <Box display="flex" justifyContent="center" my={4}>
                    <img src={PuertoImage} alt="Ocean" style={{ width: '100%', maxWidth: '600px', height: 'auto' }} />
                </Box>
            </Box>
        </Container>
    );
};

export default QuienesSomos;

