import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const QuienesSomos: React.FC = () => {
    return (
        <Container>
            <Box my={4}>
                <Typography variant="h2" component="h1" gutterBottom>
                    Quiénes Somos
                </Typography>
                <Typography variant="body1">
                    Somos una organización de sexadores de pollos
                </Typography>
            </Box>
        </Container>
    );
};

export default QuienesSomos;
