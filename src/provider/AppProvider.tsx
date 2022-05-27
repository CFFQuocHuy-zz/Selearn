import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { SnackbarProvider } from 'notistack';
import type { PropsWithChildren } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppThemeProvider from './Theme/AppThemeProvider';

export default function AppProvider({ children }: PropsWithChildren<{}>) {
  return (
    <Router>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <SnackbarProvider maxSnack={3}>
          <AppThemeProvider>{children}</AppThemeProvider>
        </SnackbarProvider>
      </LocalizationProvider>
    </Router>
  );
}
