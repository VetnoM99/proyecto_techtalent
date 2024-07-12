import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import { Contacts as ContactoIcon } from '@mui/icons-material';


const Home: React.FC = () => {
    return (
        <Container>
            <Box my={4}>
                <Typography variant="h2" component="h1" gutterBottom>
                    Contacto
                </Typography>
                <Typography variant="body1">
                    Contacta con nosotros
                </Typography>
                <ContactoIcon />
            </Box>
        </Container>
    );
};


export default Home;
