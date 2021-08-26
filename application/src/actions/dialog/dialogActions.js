import { saveNewView, saveViewAs } from '../views/viewActions';
import {
    CLOSE_DIALOG, 
    OPEN_DIALOG
} from './dialogTypes';

export const openDialog = ({title, value, saveType}) => {
    return {
        type: OPEN_DIALOG,
        payload: {
            open: true,
            title,
            value,
            saveType
        }
    };
};

export const closeDialog = () => {
    return {
        type: CLOSE_DIALOG
    };
};

export const saveDialog = (value) => {
    return (dispatch, getState) => {
        let newView = {...value, id: -1}
        const saveType = getState().dialog.saveType;
        
        if (saveType === "new") {
            dispatch(saveNewView(newView))
        } else if (saveType === "saveAs") {
            dispatch(saveViewAs(newView))
        }
        dispatch(closeDialog())
    }
};