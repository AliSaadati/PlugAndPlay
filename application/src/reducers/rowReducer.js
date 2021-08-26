import {
    FETCH_ROWS_REQUEST, 
    FETCH_ROWS_SUCCESS, 
    FETCH_ROWS_FAILURE
} from '../actions/rows/rowTypes';

const initialState = {
    loading: false,
    rows: [],
    error: ''
}

const RowReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_ROWS_REQUEST:
            
            return {
                ...state,
                loading: true
            
        }

        case FETCH_ROWS_SUCCESS:
            return {
                ...state,
                loading: false,
                rows: action.payload,
                error: ''
            }

        case FETCH_ROWS_FAILURE:
            return {
                ...state,
                loading: false,
                rows: [],
                error: action.payload
            }

        default:
            return state;
        
    }
}

export default RowReducer;