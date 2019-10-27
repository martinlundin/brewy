export default {

  palette: {
    type: 'dark',
    primary: {
      main: '#f29c51',
      contrastText: '#232323',
    },
    secondary: {
      main: '#F2BD51',
      contrastText: '#232323',
    },
    error: {
      main: '#F25551',
      contrastText: '#e5ddd2',
    },
    text: {
      primary: '#e5ddd2',
    },
    background: {
      paper: '#272727',
      default: '#232323',
    },
  },

  typography: {
    fontSize: 12,
    fontFamily: 'Staatliches, sans-serif',
  },

  overrides: {

    MuiContainer: {
      root: {
        paddingTop: '16px',
        paddingBottom: '16px',
        margin: 'auto',
      },
    },
    MuiPaper: {
      root: {
        padding: '24px 16px',
        margin: '16px 0px',
      }
    },
    MuiSvgIcon: {
      root: {
        verticalAlign: 'middle',
      },
    },
    MuiButton: {
      sizeSmall: {
        fontSize: '1rem',
      },
      root: {
        fontSize: '1.2rem',
      },
      sizeLarge: {
        fontSize: '1.4rem',
      },
    },
    MuiDivider: {
      root: {
        marginTop: '1rem',
        marginBottom: '1rem',
      },
    },
  },

  props: {
    MuiTextField: {
      variant: 'outlined',
    },
    MuiSelect: {
      variant: 'outlined',
    },
    MuiButton: {
      color: 'primary',
    },
    MuiTypography: {
      variantMapping: {
        body2: 'span',
      },
    },
  },
};
