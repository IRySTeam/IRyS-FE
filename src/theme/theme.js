import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const base = createTheme({
  palette: {
    primary: {
      main: '#2C81C9',
      light: '#D4F2FC',
      darker: '#2064AC',
    },
    secondary:{
      main: '#5BC0F8',
      light: '#DEFBFE',
      darker: '#4297D5',
    },
    error: {
      // danger
      main: '#FF3A51',
      light: '#FFE1D7',
      darker: '#B71D4B',
    },
    warning:{
      main: '#FAC93C',
      light: '#FEF8D8',
      darker: '#D7A62B',
    },
    info: {
      main: '#2C81C9',
      light: '#D4F2FC',
      darker: '#2064AC',
    },
    success:{
      main: '#25A338',
      light: '#DCFAD3',
      darker: '#127533',
    },
    black:{
      main: '#1A1A1A', //black-90
    },
    white:{
      main: '#FFFFFF', //white-00
    },
    dark_gray:{
      main: '#6B6B6B', //black-10
      light: '#757575', //black-00
      darker: '#424242', //black-50
    },
    light_gray:{
      main: '#CCCCCC', //white-50
      light: '#F5F5F5', //white-10
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
