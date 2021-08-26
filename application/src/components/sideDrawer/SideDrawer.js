import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddBoxIcon from '@material-ui/icons/AddBox';
import SaveIcon from '@material-ui/icons/Save';
import CreateIcon from '@material-ui/icons/Create';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import GetAppIcon from '@material-ui/icons/GetApp';

import { useSelector, useDispatch } from 'react-redux';
import { fetchRows } from '../../actions/rows/rowActions';
import { openDialog } from '../../actions/dialog/dialogActions';
import { saveView } from '../../actions/views/viewActions';

import useExportExcel from '../../hooks/useExportExcel'

const drawerWidth = 240;


const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(7) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    }
}));

export default function SideDrawer({ open, setOpen }) {
    const dispatch = useDispatch();
    const classes = useStyles();
    const theme = useTheme();


    const allRows = useSelector(state => state.rows.rows);
    const currView = useSelector(state => state.views.currentView);
    const viewList = useSelector(state => state.views.viewList);

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const runQueryHandler = () => {
        dispatch(fetchRows())
    }

    const saveViewHandler = () => {
        dispatch(saveView())
    }

    const addNewViewHandler = () => {
        dispatch(openDialog({
            title: "Add a new View",
            value: {
                name: "",
                type: ""
            },
            saveType: "new"
        }))
    }

    const saveAsViewHandler = () => {
        dispatch(openDialog({
            title: "Save current View as",
            value: {
                name: uniqueViewName(currView.name),
                type: "default"
            },
            saveType: "saveAs"
        }))
    }

    const exportDataHandler = useExportExcel(allRows);

    const uniqueViewName = (currentViewName) => {
        let viewNameList = viewList.map(view => view.name);
        let ind = 1;
        let newViewName = `${currentViewName}-${ind}`
        while (viewNameList.indexOf(newViewName) > -1)
            newViewName = `${currentViewName}-${++ind}`
        return newViewName
    }

    return (
        <>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem onClick={runQueryHandler} button>
                        <ListItemIcon><PlayArrowIcon /></ListItemIcon>
                        <ListItemText primary="Run Query" />
                    </ListItem>
                    <ListItem onClick={exportDataHandler.exportData} button>
                        <ListItemIcon><GetAppIcon /></ListItemIcon>
                        <ListItemText primary="Download Table" />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem onClick={addNewViewHandler} button>
                        <ListItemIcon><AddBoxIcon /></ListItemIcon>
                        <ListItemText primary="Add View" />
                    </ListItem>
                    <ListItem onClick={saveViewHandler} button>
                        <ListItemIcon><SaveIcon /></ListItemIcon>
                        <ListItemText primary="Save View" />
                    </ListItem>
                    <ListItem onClick={saveAsViewHandler} button>
                        <ListItemIcon><CreateIcon /></ListItemIcon>
                        <ListItemText primary="Save View As" />
                    </ListItem>
                </List>
            </Drawer>
        </>
    );
}