import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Proyecto: React.FC = () => {
    return (
        <Container>
            <Box my={4}>
                <Typography variant="h2" component="h1" gutterBottom>
                    Proyecto
                </Typography>
                <Typography variant="body1">
                    Detalles sobre el proyecto...
                </Typography>
            </Box>
        </Container>
    );
};

export default Proyecto;