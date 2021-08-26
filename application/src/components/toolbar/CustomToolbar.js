import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: { /**/ 
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: { /**/ 
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: { /**/
        marginRight: 36,
    },
    hide: {
        display: 'none',
    }
    
}));

const CustomToolbar = ({open, setOpen, displayMenu=false}) => {

    const classes = useStyles();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    return (
        <AppBar
        position={displayMenu ? "fixed" : "absolute"}
        className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
        })}
    >

        <Toolbar>
            {displayMenu ? 
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, {
                    [classes.hide]: open,
                })}
            >
                <MenuIcon /> 
            </IconButton> : null }
            <Typography variant="h6" noWrap>
                <img 
                    src="/images/as-logo.png" 
                    style={{height:50, verticalAlign:'middle', paddingRight:'1rem'}}
                    alt="AS Logo" />Plug and Play Database Reporting
            </Typography>
        </Toolbar>

    </AppBar>
    )
}

export default CustomToolbar;
