import React, { useEffect, useRef, useState } from 'react';
import theme from './theme'
import { ThemeProvider, Typography } from '@material-ui/core';
import AccordionMenu from './components/accordian/AccordionMenu';
import DataTable from './components/dataTable/DataTable';
import { initializeState } from './actions/shared/sharedActions';
import { useSelector, useDispatch } from 'react-redux';
import SideDrawer from './components/sideDrawer/SideDrawer'
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import CustomToolbar from './components/toolbar/CustomToolbar'

import clsx from 'clsx';
import SaveDialog from './components/dialog/SaveDialog';
import useWindowSize from './hooks/useWindowSize';
import MobileNav from './components/bottomNavigation/MobileNav';
import FloatingLink from './components/floatingLink/FloatingLink';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  description: {
    margin: '1rem auto 2rem 0',
    maxWidth: '50rem'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    width: "1px",
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  contentShift: { /**/
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  currentViewDisplay:{ 
    textAlign: 'center', 
    margin: '1rem 0 2rem 0' 
  },
  contentContainer: {
    position: 'relative', 
    display: 'flex', 
    flexWrap: 'wrap', 
    margin: '-.5rem -.5rem' 
  },
  accordionContainer: { 
    verticalAlign: 'top', 
    display: 'inline-block', 
    height: '100%', 
    flex: "1 1 30rem", 
    margin: '.5rem' 
  },
  dataTableContainer: { 
    verticalAlign: 'top', 
    display: 'inline-block', 
    flex: "9999 1 30rem", 
    margin: '.5rem', 
    width: '20rem' 
  }
}))

export default function App() {

  const classes = useStyles(theme);
  const dispatch = useDispatch();
  const { width: windowWidth } = useWindowSize();
  const currentViewName = useSelector(state => state.views.currentView.name)
  const hasLoaded = useRef(false);
  const fieldsLoading = useSelector(state => (!hasLoaded.current && state.fields));
  const viewsLoading = useSelector(state => (!hasLoaded.current && state.views.loading));

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!hasLoaded.current) {
      dispatch(initializeState())
    }
  }, [dispatch])

  if (!fieldsLoading.loading && !viewsLoading.loading)
    hasLoaded.current = true


  return (
    <>
      {(fieldsLoading.loading || viewsLoading.loading) && !hasLoaded.current && <div>Loading...</div>}
      {!fieldsLoading.loading && !viewsLoading.loading && hasLoaded.current &&
        <>

          <ThemeProvider theme={theme}>
            <div style={{ display: 'flex' }}>
              <CssBaseline />
              <CustomToolbar displayMenu={windowWidth > 699} open={open} setOpen={setOpen} />
              {windowWidth > 699 ? <SideDrawer open={open} setOpen={setOpen} /> : null}
              <main
                className={clsx(classes.content, {
                  [classes.contentShift]: open,
                })}>
                <div className={classes.toolbar} />
                <Typography className={classes.description}><strong>Demo</strong><br /> Easily generate and export ad hoc reports and store reporting parameters for ongoing use.</Typography>
                <Typography className={classes.currentViewDisplay}>Current View: <strong>{currentViewName}</strong></Typography>
                <div className={classes.contentContainer}>
                  <div className={classes.accordionContainer}>
                    <AccordionMenu />
                  </div>
                  <div className={classes.dataTableContainer}>
                    <DataTable />
                  </div>
                </div>
              </ main>
            </div>
            <SaveDialog />
            <FloatingLink />
            {windowWidth <= 699 ? <MobileNav /> : null}
          </ThemeProvider>
        </>
      }
    </>
  );
}

