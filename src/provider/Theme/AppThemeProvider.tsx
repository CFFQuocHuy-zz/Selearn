import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as React from 'react';

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
  }
  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
  }

  interface PaletteColor {
    darker?: string;
  }
  interface SimplePaletteColorOptions {
    darker?: string;
  }
}

export interface IThemeContext {
  toggleColorMode: () => void;
}

export const defaultTheme: IThemeContext = {
  toggleColorMode: () => {},
};

const ColorModeContext = React.createContext(defaultTheme);

export default function AppThemeProvider({ children }: React.PropsWithChildren<{}>) {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: 'rgb(235,123,69)',
            contrastText: 'white',
          },
          secondary: {
            main: 'rgb(52,202,224)',
            dark: 'rgb(44,192,213)',
            contrastText: 'white',
          },
          neutral: {
            light: 'rgb(244,247,249)',
            main: 'rgb(232,236,239)',
            dark: 'rgb(157,168,175)',
          },
        },
        typography: {
          h6: {
            fontSize: '1.125rem',
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                fontWeight: 500,
              },
            },
          },
          MuiFormLabel: {
            styleOverrides: {
              asterisk: {
                color: '#db3131',
                '&$error': {
                  color: '#db3131',
                },
              },
            },
          },
          MuiCssBaseline: {
            styleOverrides: {
              html: {
                height: '100%',
              },
              body: {
                height: '100%',
              },
              '#root': {
                height: '100%',
              },
            },
          },
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
