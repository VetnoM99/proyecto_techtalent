import React from 'react';
import { Container, Typography, Box } from '@mui/material';


const Participa: React.FC = () => {
    return (
        <Container>
            <Box my={4}>
                <Typography variant="h2" component="h1" gutterBottom>
                    Participa
                </Typography>
                <Typography variant="body1">
                    Contenido para la página de participación
                </Typography>
                
            </Box>
        </Container>
    );
};


export default Participa;
