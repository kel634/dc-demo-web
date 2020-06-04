import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Footer from './Footer';
import Album from './Album'

export default function App() {
  return (
    <Container>
      <Box my={4}>
        <Album />
        <Footer />
      </Box>
    </Container>
  );
}
