import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material'; 


const Home: React.FC = () => {
    return (
        <Container>
            <Box my={4}>
                <Typography variant="h2" component="h1" gutterBottom>
                    Inicio
                </Typography>
                <HomeIcon /> 
            </Box>
        </Container>
    );
};


export default Home;
