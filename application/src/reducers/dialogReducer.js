import {
    OPEN_DIALOG,
    CLOSE_DIALOG
} from '../actions/dialog/dialogTypes';

const initialState = {
    open: false,
    title: "",
    value: {name:"", type: "default"}
}

const DialogReducer = (state = initialState, action) => {
    switch (action.type) {
        case OPEN_DIALOG:
            const {title, value, open, saveType} = action.payload;
            return {
                open: open,
                title: title,
                value: {name: value.name, type: value.type},
                saveType: saveType
        }

        case CLOSE_DIALOG:
            return {
                open: false,
                title: "",
                value: {name: "", type: ""},
                saveType: ""
            }

        // case SAVE_DIALOG:
        //     return {
        //         loading: false,
        //         columnList: [],
        //         error: action.payload
        //     }
        default:
            return state;
    }
}

export default DialogReducer;