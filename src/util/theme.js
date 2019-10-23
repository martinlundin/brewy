export default {

  palette: {
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

    MuiInputLabel: {
      root: {
        color: '#e5ddd2',
      },
    },
    MuiOutlinedInput: {
      notchedOutline: {
        borderColor: '#e5ddd2',
      },
    },
    MuiButton: {
      root: {
        fontSize: '1rem',
      },
      sizeSmall: {
        fontSize: '0.8rem',
      },
      sizeLarge: {
        fontSize: '1.2rem',
      },
    },

  },

  props: {
    MuiTextField: {
      variant: 'outlined',
    },
  },
};
