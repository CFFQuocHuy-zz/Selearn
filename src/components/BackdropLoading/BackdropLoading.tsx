import { Backdrop, CircularProgress, Theme } from '@mui/material';

export default function BackdropLoading() {
  return (
    <Backdrop sx={{ color: '#fff', zIndex: (theme: Theme) => theme.zIndex.drawer + 1 }} open={true}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
