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
    MuiInputBase: {
      input: {
        fontSize: '1.5rem',
      },
    },
    MuiInputLabel: {
      outlined: {
        transform: 'translate(14px, 26px) scale(1)',
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

  },

  props: {
    MuiTextField: {
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
