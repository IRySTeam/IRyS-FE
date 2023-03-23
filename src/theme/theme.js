import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { palette } from './color';
import { typography } from './typography';

const base = createTheme({
  palette: palette,
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1200,
    },
  },
  typography: typography,
});

const theme = responsiveFontSizes(base)

export default theme
