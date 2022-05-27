import { Box, Container } from '@mui/material';
import { AppHeader } from '..';
import { AppRoutes } from '../../../routes/AppRoutes';

const AppShell = () => {
  return (
    <Box sx={{ minHeight: '100%', backgroundColor: 'neutral.main' }}>
      <AppHeader />
      <Container maxWidth="xl" sx={{ backgroundColor: '#ffffff', height: '100%' }} disableGutters>
        <AppRoutes />
      </Container>
    </Box>
  );
};

export default AppShell;
