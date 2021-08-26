import React, { useEffect } from 'react';
import { Button } from "@material-ui/core";
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from "@material-ui/core/styles"

import FreeSoloCreateOptionDialog from '../input/FreeSoloCreateOptionDialogue'
import { saveView, deleteView } from '../../actions/views/viewActions';
import { openDialog } from '../../actions/dialog/dialogActions';
import SaveDialog from '../dialog/SaveDialog';

const useStyles = makeStyles((theme) => ({
    buttonContainer: {
        paddingTop: '1.5rem',
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%'
    }
}));

export default function ViewMenuItem() {

    const classes = useStyles()
    const currView = useSelector(state => state.views.currentView);
    const viewList = useSelector(state => state.views.viewList)

    const dispatch = useDispatch();
    
    useEffect(() => {
        
    }, [])
 
    const saveViewHandler = () => {
        dispatch(saveView())
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
    
    const deleteViewHandler = () => {
        dispatch(deleteView())
    }

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
            <FreeSoloCreateOptionDialog style={{ width: '100%' }} />
            <div className={classes.buttonContainer}>
                <div>
                    <Button
                        size="small"
                        style={{ marginRight: '.5rem' }}
                        variant='contained'
                        color="primary"
                        onClick={saveViewHandler}
                        disableElevation>Save</Button>
                    <Button
                        size="small"
                        onClick={saveAsViewHandler}
                        color="primary">Save As</Button>
                </div>
                <div>
                    <Button
                        size="small"
                        onClick={deleteViewHandler}
                        variant='contained'
                        color="secondary"
                        disableElevation>Delete</Button>
                </div>
            </div>
            <SaveDialog 
            
            />
        </>
    )
}

