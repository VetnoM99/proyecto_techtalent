import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const FooterBar: React.FC = () => {
  return (
    <Box
      sx={{
        py: 3,
        px: 0,
        mt: 'auto', // Use 'auto' to push the footer to the bottom
        backgroundColor: '#3c3c3c',
        width: '100%', // Ensure full width
        color: 'white',
        position: 'relative',
        bottom: 0
      }}
      component="footer"
    >
      <Container maxWidth="lg">
        <Typography variant="body1">
          © 2024 PortNet. Todos los derechos reservados.
        </Typography>
      </Container>
    </Box>
  );
};

export default FooterBar;
