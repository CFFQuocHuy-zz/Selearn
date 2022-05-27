import { AppBar, Avatar, Box, Container, Toolbar, Typography, Stack } from '@mui/material';

const AppHeader = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: 'neutral.main', boxShadow: 'none' }}>
      <Container maxWidth="xl" sx={{ py: { md: 3 } }}>
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ mr: 2 }}>
            <Typography
              variant="h2"
              noWrap
              sx={{
                fontWeight: 900,
                letterSpacing: '-.1rem',
                color: 'primary.main',
                textDecoration: 'none',
              }}
            >
              SAF
            </Typography>

            <Typography
              sx={{
                fontWeight: 500,
                display: { xs: 'none', md: 'block' },
                mt: '-0.5rem',
                color: 'neutral.dark',
              }}
            >
              Student Administration Framework
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Avatar alt="Adam" src="/static/images/avatar/2.jpg" />

              <Typography component="div" color="black" fontWeight={500}>
                Adam
              </Typography>
            </Stack>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default AppHeader;
