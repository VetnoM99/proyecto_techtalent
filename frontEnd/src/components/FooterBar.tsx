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
        backgroundColor: (theme) =>
          theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
        position: 'fixed',
        bottom: 0,
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