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
<<<<<<< HEAD
        mt: 'auto',
=======
        mt: 'auto', // Use 'auto' to push the footer to the bottom
>>>>>>> a3942194c8660697bb0f2c6e0df17e4645453177
        backgroundColor: '#3c3c3c',
        width: '100%', // Ensure full width
        color: 'white',
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