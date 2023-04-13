export const black = {
  0: '#757575',
  10: '#6B6B6B',
  20: '#616161',
  30: '#575757',
  40: '#4D4D4D',
  50: '#424242',
  60: '#383838',
  70: '#2E2E2E',
  80: '#242424',
  90: '#1A1A1A',
  100: '#000000'
};

export const white = {
  0: '#FFFFFF',
  10: '#F5F5F5',
  20: '#EBEBEB',
  30: '#E0E0E0',
  40: '#D6D6D6',
  50: '#CCCCCC',
  60: '#C2C2C2',
  70: '#B8B8B8',
  80: '#ADADAD',
  90: '#A3A3A3'
};

export const primary = {
  10: '#D4F2FC',
  20: '#ABE2F9',
  30: '#7EC7EE',
  40: '#5CA9DE',
  50: '#2C81C9',
  60: '#2064AC',
  70: '#164B90',
  80: '#0E3574',
  90: '#082560',
};

export const secondary = {
  10: '#DEFBFE',
  20: '#BDF3FE',
  30: '#9CE6FC',
  40: '#83D7FA',
  50: '#5BC0F8',
  60: '#4297D5',
  70: '#2D72B2',
  80: '#1D518F',
  90: '#113977'
};

export const success = {
  10: '#DCFAD3',
  20: '#B3F5A9',
  30: '#7DE379',
  40: '#53C75A',
  50: '#25A338',
  60: '#1B8C36',
  70: '#127533',
  80: '#0B5E2F',
  90: '#074E2C',
};

export const info = {
  10: '#D4F2FC',
  20: '#ABE2F9',
  30: '#7EC7EE',
  40: '#5CA9DE',
  50: '#2C81C9',
  60: '#2064AC',
  70: '#164B90',
  80: '#0E3574',
  90: '#082560',
};

export const warning = {
  10: '#FEF8D8',
  20: '#FEF0B1',
  30: '#FDE589',
  40: '#FBDA6C',
  50: '#FAC93C',
  60: '#D7A62B',
  70: '#B3851E',
  80: '#906613',
  90: '#77500B',
};

export const danger = {
  10: '#FFE1D7',
  20: '#FFBCB0',
  30: '#FF9088',
  40: '#FF6B6E',
  50: '#FF3A51',
  60: '#DB2A4F',
  70: '#B71D4B',
  80: '#931245',
  90: '#7A0B41'
};

export const palette = {
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
  },
  backdrop:{
    main: 'rgba(0, 0, 0, 0.5)',
  }
}