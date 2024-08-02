import React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import '../styles/FooterBar.css'; // Asegúrate de importar el archivo CSS

import icon1 from '../assets/Cambrils.png'; // Importa las imágenes
import icon2 from '../assets/Reus.png';
import icon3 from '../assets/Generalitat.png';
import icon4 from '../assets/Cluster.png';
import icon5 from '../assets/Salou.png';
import icon6 from '../assets/Redessa .png';

const FooterBar: React.FC = () => {
  return (
    <Box className="footer-bar" component="footer">
      <Container className="container">
        <Typography variant="body1" className="text">
          © 2024 PortNet. Todos los derechos reservados.
        </Typography>
        <Box className="button-container">
          <Button 
            component={Link} 
            to="/faq" 
            variant="contained" 
            className="button"
          >
            FAQs
          </Button>
          <Button 
            component={Link} 
            to="/contacto" 
            variant="contained" 
            className="button"
          >
            Contacto
          </Button>
        </Box>
        <Box className="icons-container">
          <img src={icon1} alt="Icon 1" className="icon" />
          <img src={icon2} alt="Icon 2" className="icon" />
          <img src={icon5} alt="Icon 5" className="icon" />
          <img src={icon3} alt="Icon 3" className="icon" />
          <img src={icon4} alt="Icon 4" className="icon" />
          <img src={icon6} alt="Icon 6" className="icon" />
        </Box>
      </Container>
    </Box>
  );
};

export default FooterBar;
