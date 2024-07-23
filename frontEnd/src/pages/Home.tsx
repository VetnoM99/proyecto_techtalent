import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material'; 


const Home: React.FC = () => {
    return (
        <Container>
            <Box my={4}>
                <Typography variant="h2" component="h1" gutterBottom>
                   Bienvenidos a Port⭕Net
                </Typography>
                <HomeIcon /> 
                <Typography>
                Trabajamos para combatir la contaminación marítima y proteger nuestros océanos.
            Fundados en el año 2024 nuestro objetivo está que en 2030 poder lograr un futuro limpio y sostenible la Costa Dorada.
            En la que nuestras especies se conserven en paz y de manera sana en un mar completamente limpio.
                </Typography>
            </Box>
        </Container>
    );
};


export default Home;
