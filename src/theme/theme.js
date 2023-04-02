import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { palette } from './color';
import { typography } from './typography';

const base = createTheme({
  palette: palette,
  breakpoints: {
    values: {
      mobile: 0,
      mobile_l: 425,
      tablet: 768,
      small: 1024,
      laptop: 1280,
      desktop: 1440,
      large: 1900
    },
  },
  typography: typography,
});

const theme = responsiveFontSizes(base)

export default theme
