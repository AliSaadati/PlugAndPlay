import axios from 'axios';
import {
    FETCH_QUERYS_REQUEST, 
    FETCH_QUERYS_SUCCESS, 
    FETCH_QUERYS_FAILURE,
    SET_QUERY,
    ADD_QUERY,
    REMOVE_QUERY
} from './queryTypes';

const fetchQuerysRequest = () => {
    return {
        type: FETCH_QUERYS_REQUEST
    };
};

const fetchQuerysSuccess = querys => {
    return {
        type: FETCH_QUERYS_SUCCESS,
        payload: querys
    };
};

const fetchQuerysFailure = error => {
    return {
        type: FETCH_QUERYS_FAILURE,
        payload: error
    };
};

export const fetchQuerys = (id) => {
    return (dispatch) => {
        dispatch(fetchQuerysRequest());
        axios.get(`https://wagkjuaokk.execute-api.us-west-1.amazonaws.com/prod/querys/${id}`)
            .then(res => {
                dispatch(fetchQuerysSuccess(res.data))
            })
            .catch(err => {
                dispatch(fetchQuerysFailure(err.message))
            })
    }
}

export const setQuery = (prop, id) => {
    return {
        type: SET_QUERY,
        payload: { property: prop.property, value:prop.value, id: id }
    }
}

export const addQuery = (queryProperties) => {
    return {
        type: ADD_QUERY,
        payload: queryProperties
    }
}

export const removeQuery = (id) => {
    return {
        type: REMOVE_QUERY,
        payload: {id: id}
    }
}