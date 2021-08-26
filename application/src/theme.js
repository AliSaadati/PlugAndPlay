import { createTheme } from '@material-ui/core/styles';
import { teal, red } from '@material-ui/core/colors'

const theme = createTheme({
  typography: {
    fontFamily: [
      'montserrat',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif'
    ].join(','),
  },
  palette: {
    primary: {
      main: teal[500],
      light: teal[400]
    },
    secondary: {
      main: red[500]
    },
    error: {
      main: red[400]
    }
  },
  overrides: {
    MuiSelect: {
      select: {
        "&:focus": {
          backgroundColor: "transparent"
        }
      }
    },
    MuiToolbar: {
      gutters: {
        paddingLeft: "24px",
        paddingRight: "24px"
      }
    },
    MuiBottomNavigation: {
      root: {
        backgroundColor: teal[500],
        position: 'fixed',
        bottom: 0,
        right: 0,
        left: 0,
        zIndex: 2
      }
    },
    MuiBottomNavigationAction: {
      root: {
        color: 'white',
      },
      label:{
        fontWeight:700,
        fontSize: '.6rem',
        textTransform: 'uppercase'
      }
    }
  }
});

export default theme;