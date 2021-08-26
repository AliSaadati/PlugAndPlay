import {
    FETCH_ROWS_REQUEST,
    FETCH_ROWS_SUCCESS,
    FETCH_ROWS_FAILURE
} from './rowTypes';

const fetchRowsRequest = () => {
    return {
        type: FETCH_ROWS_REQUEST
    };
};

const fetchRowsSuccess = rows => {
    return {
        type: FETCH_ROWS_SUCCESS,
        payload: rows
    };
};

const fetchRowsFailure = error => {
    return {
        type: FETCH_ROWS_FAILURE,
        payload: error
    };
};

export const fetchRows = () => {
    return async (dispatch, getState) => {
        dispatch(fetchRowsRequest());
        
        try {
            let res = await fetch('https://wagkjuaokk.execute-api.us-west-1.amazonaws.com/prod/rows', {
                method: 'POST',
                cache: 'no-cache',
                headers: { 'Content-Type': 'application/json' },
                referrerPolicy: 'no-referrer',
                body: JSON.stringify({ querys: getState().querys.queryList })
            })
            res = await res.json()
            dispatch(fetchRowsSuccess(res))
        } catch (err) {
            dispatch(fetchRowsFailure(err.message))

        }
    }
}

