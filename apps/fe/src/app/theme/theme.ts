
const theme = {
  borderRadius: '.5em',
  colors: {
    fg: '#222',
    fgLighter: '#444',
    fgLighter2: '#888',
    fgDarkest: '#000',
    fgLightest: '#EEE',

    primary: '#FFCF59',
    secondary: '#C8E0F0',

    bg: '#f0f0f0',
    bgTblRow: '#ddd',
    bgTblRowOdd: '#eee',
    bgTblHeader: '#496273'
  },
  table: {

  },
  alert: {
    error: {
      bg: '#FED0DD',
      fg: '#8D0E33',
      border: '1px solid #8D0E33',
    },
    success: {
      bg: '#AEE0F2',
      fg: '#229FCC',
      border: '1px solid #229FCC',
    },
    warning: {
      bg: '#FFF8C1',
      fg: '#FFC80A',
      border: '1px solid #FFC80A',
    },
    info: {
      bg: '#C7E9EF',
      fg: '#418490',
      border: '1px solid #418490',
    }
  }
};

export default theme;
export type CustomTheme = typeof theme;