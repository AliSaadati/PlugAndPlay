import axios from 'axios';
import {
    FETCH_FIELDS_REQUEST, 
    FETCH_FIELDS_SUCCESS, 
    FETCH_FIELDS_FAILURE
} from './fieldTypes';

const fetchFieldsRequest = () => {
    return {
        type: FETCH_FIELDS_REQUEST
    };
};

const fetchFieldsSuccess = fields => {
    return {
        type: FETCH_FIELDS_SUCCESS,
        payload: fields
    };
};

const fetchFieldsFailure = error => {
    return {
        type: FETCH_FIELDS_FAILURE,
        payload: error
    };
};

export const fetchFields = () => {
    return async (dispatch) => {
        dispatch(fetchFieldsRequest());

        axios.get('https://wagkjuaokk.execute-api.us-west-1.amazonaws.com/prod/fields')
            .then(res => {
                dispatch(fetchFieldsSuccess(res.data))
            })
            .catch(err => {
                dispatch(fetchFieldsFailure(err.message))
            })
    }
}