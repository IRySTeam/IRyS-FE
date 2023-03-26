import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { palette } from './color';
import { typography } from './typography';

const base = createTheme({
  palette: palette,
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 768,
      laptop: 1024,
      desktop: 1440,
      large: 1900
    },
  },
  typography: typography,
  overrides: {
    MuiInputBase: {
      input: {
        fontFamily: 'Inter, sans-serif',
        fontSize: 20,
        fontWeight: 400,
      }
    }
  },
});

const theme = responsiveFontSizes(base)

export default theme
