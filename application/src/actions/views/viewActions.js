import axios from 'axios';
import {
    FETCH_VIEWS_REQUEST,
    FETCH_VIEWS_SUCCESS,
    FETCH_VIEWS_FAILURE,
    SET_CURRENT_VIEW,
    SAVE_VIEW_REQUEST,
    // SAVE_VIEW_SUCCESS,
    // SAVE_VIEW_FAILURE,
    DELETE_VIEW_REQUEST,
    DELETE_VIEW_SUCCESS,
    DELETE_VIEW_FAILURE
} from './viewTypes';
import { fetchQuerys } from '../querys/queryActions';

export const fetchViewsRequest = () => {
    return {
        type: FETCH_VIEWS_REQUEST
    };
};

export const fetchViewsSuccess = fields => {
    return {
        type: FETCH_VIEWS_SUCCESS,
        payload: fields
    };
};

export const fetchViewsFailure = error => {
    return {
        type: FETCH_VIEWS_FAILURE,
        payload: error
    };
};


export const fetchViews = () => {
    return async (dispatch) => {
        dispatch(fetchViewsRequest());

        try {
            const res = await axios.get('https://wagkjuaokk.execute-api.us-west-1.amazonaws.com/prod/views');
            dispatch(fetchViewsSuccess(res.data));
        } catch (error) {
            dispatch(fetchViewsFailure(error.message));
        }
    }
}

export const setCurrentView = currentView => {
    return {
        type: SET_CURRENT_VIEW,
        payload: currentView
    }
}

export const saveViewRequest = () => {
    return {
        type: SAVE_VIEW_REQUEST
    };
};

// const saveViewSuccess = fields => {
//     return {
//         type: SAVE_VIEW_SUCCESS,
//         payload: fields
//     };
// };

// const saveViewFailure = error => {
//     return {
//         type: SAVE_VIEW_FAILURE,
//         payload: error
//     };
// };

export const saveView = () => {
    return async (dispatch, setState) => {

        const state = setState();

        const body = {
            view: state.views.currentView,
            columns: state.columns.columnList,
            querys: state.querys.queryList
        }

        try {
            await axios.post('https://wagkjuaokk.execute-api.us-west-1.amazonaws.com/prod/save', body)
            if (state.querys.queryList.some(value => value.id < 0)) {
                dispatch(fetchQuerys(state.views.currentView.id));
            }

        } catch (error) {
            console.log(error)
        }
    }
}

export const saveNewView = (newView) => {
    return async (dispatch) => {

        const body = {
            view: { ...newView }
        }

        try {
            // save new view
            let res = await axios.post('https://wagkjuaokk.execute-api.us-west-1.amazonaws.com/prod/save', body);

            // refresh views
            await dispatch(fetchViews());

            // set current view to newly saved view
            dispatch(setCurrentView(res.data))

        } catch (error) {
            console.log(error)
        }
    }
}

export const saveViewAs = (newView) => {
    return async (dispatch, setState) => {

        const state = setState();

        const body = {
            view: { ...newView },
            columns: state.columns.columnList,
            querys: state.querys.queryList
        }

        try {
            // save new view
            let res = await axios.post('https://wagkjuaokk.execute-api.us-west-1.amazonaws.com/prod/save', body);

            // refresh views
            await dispatch(fetchViews());

            console.log(res)
            // set current view to newly saved view
            dispatch(setCurrentView(res.data))

            // fetch queries if newly created query was saved
            if (state.querys.queryList.some(value => value.id < 0)) {
                dispatch(fetchQuerys(res.data.id));
            }

        } catch (error) {
            console.log(error)
        }

        // let json = await response.json();
        // return { status: response.status, body: json }
    }
}

export const deleteViewRequest = () => {
    return {
        type: DELETE_VIEW_REQUEST
    };
};

export const deleteViewSuccess = (deletedView) => {
    return {
        type: DELETE_VIEW_SUCCESS,
        payload: deletedView
    };
};

export const deleteViewFailure = error => {
    return {
        type: DELETE_VIEW_FAILURE,
        payload: error
    };
};


export const deleteView = () => {
    return async (dispatch, setState) => {

        dispatch(deleteViewRequest())
        const deletedView = {
            data:
            {
                view:
                    setState().views.currentView
            }
        };

        try {
            console.log(1)
            await axios.delete('https://wagkjuaokk.execute-api.us-west-1.amazonaws.com/prod/delete', deletedView );
            console.log(2)
            dispatch(deleteViewSuccess(deletedView));
            console.log(3)
            dispatch(setCurrentView({ id: 1, name: "default", type: "default" }))
            console.log(4)
        } catch (error) {
            dispatch(deleteViewSuccess(error.message))
        }
    }
}