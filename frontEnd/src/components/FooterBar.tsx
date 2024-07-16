import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const FooterBar: React.FC = () => {
  return (
    <Box
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: '#3c3c3c',
        width: '100%',
      }}
      component="footer"
    >
      <Container maxWidth="lg">
        <Typography variant="body1">
          © 2024 PortNet
        </Typography>
      </Container>
    </Box>
  );
}

export default FooterBar;