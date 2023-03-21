import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { black, white, primary, secondary, info, warning, success, danger } from './color';

const base = createTheme({
  palette: {
    primary: {
      main: primary[50],
      light: primary[10],
      darker: primary[60],
    },
    secondary:{
      main: secondary[50],
      light: secondary[10],
      darker: secondary[60],
    },
    error: {
      main: danger[50],
      light: danger[10],
      darker: danger[70],
    },
    warning:{
      main: warning[50],
      light: warning[10],
      darker: warning[60],
    },
    info: {
      main: info[50],
      light: info[10],
      darker: info[60],
    },
    success:{
      main: success[50],
      light: success[10],
      darker: success[70],
    },
    black:{
      main: black[90],
    },
    white:{
      main: white[0],
    },
    dark_gray:{
      main: black[10],
      light: black[0],
      darker: black[50],
    },
    light_gray:{
      main: white[50],
      light: white[10],
    }
  },
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1200,
    },
  },
});

const theme = responsiveFontSizes(base)

export default theme
