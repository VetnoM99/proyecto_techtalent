// src/components/FooterBar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import '../styles/FooterBar.css'; // Asegúrate de importar el archivo CSS

const FooterBar: React.FC = () => {
  return (
    <Box className="footer-bar" component="footer">
      <Container className="container">
        <Typography 
          variant="body1" 
          className="text"
        >
          © 2024 PortNet. Todos los derechos reservados.
        </Typography>
        <Button 
          component={Link} 
          to="/faq" 
          variant="contained" 
          className="button"
        >
         FAQs
        </Button>
      </Container>
    </Box>
  );
};

export default FooterBar;
