import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import SaveIcon from '@material-ui/icons/Save';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import GetAppIcon from '@material-ui/icons/GetApp';
import { makeStyles } from '@material-ui/core/styles'
import { fetchRows } from '../../actions/rows/rowActions';
import { openDialog } from '../../actions/dialog/dialogActions';
import { saveView } from '../../actions/views/viewActions';

import useExportExcel from '../../hooks/useExportExcel'
const useStyles = makeStyles((theme) => ({
    root: {

    },
    divider: {
        display: "inline",
        borderRight: '1.5px solid #eeeeee'
    },
    opaqueDivider: {
        display: "inline",
        borderRight: '1px solid #eeeeee99'
    }
}))

function MobileNav() {
    const classes = useStyles();
    const dispatch = useDispatch();

    const allRows = useSelector(state => state.rows.rows);
    const exportDataHandler = useExportExcel(allRows);

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

    return (
        <BottomNavigation
            showLabels
            className={classes.root}
        >
            <BottomNavigationAction onClick={runQueryHandler} label="Run Query" icon={<PlayArrowIcon />} />
            <div className={classes.opaqueDivider} />
            <BottomNavigationAction onClick={exportDataHandler.exportData} label="Export" icon={<GetAppIcon />} />
            <div className={classes.divider} />
            <BottomNavigationAction onClick={addNewViewHandler} label="New View" icon={<AddBoxIcon />} />
            <div className={classes.opaqueDivider} />
            <BottomNavigationAction onClick={saveViewHandler} label="Save View" icon={<SaveIcon />} />
        </BottomNavigation>
    )
}

export default MobileNav
