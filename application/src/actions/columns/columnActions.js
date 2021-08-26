import axios from 'axios';
import {
    FETCH_COLUMNS_REQUEST, 
    FETCH_COLUMNS_SUCCESS, 
    FETCH_COLUMNS_FAILURE,
    SET_COLUMNS
} from './columnTypes';

const fetchColumnsRequest = () => {
    return {
        type: FETCH_COLUMNS_REQUEST
    };
};

const fetchColumnsSuccess = columns => {
    return {
        type: FETCH_COLUMNS_SUCCESS,
        payload: columns
    };
};

const fetchColumnsFailure = error => {
    return {
        type: FETCH_COLUMNS_FAILURE,
        payload: error
    };
};

export const fetchColumns = currentViewId => {
    return (dispatch) => {
        dispatch(fetchColumnsRequest());
        axios.get(`https://wagkjuaokk.execute-api.us-west-1.amazonaws.com/prod/columns/${currentViewId}`)
            .then(res => {
                dispatch(fetchColumnsSuccess(res.data))
            })
            .catch(err => {
                dispatch(fetchColumnsFailure(err.message))
            })
    }
}

export const setColumns = columnList => {
    return {
        type: SET_COLUMNS,
        payload: columnList
    }
}