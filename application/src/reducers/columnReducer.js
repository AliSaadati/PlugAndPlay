import {
    FETCH_COLUMNS_REQUEST, 
    FETCH_COLUMNS_SUCCESS, 
    FETCH_COLUMNS_FAILURE,
    SET_COLUMNS
} from '../actions/columns/columnTypes';

const initialState = {
    loading: true,
    columnList: [],
    error: ''
}

const ColumnReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COLUMNS_REQUEST:
            
            return {
                ...state,
                loading: true
            
        }

        case FETCH_COLUMNS_SUCCESS:
            return {
                loading: false,
                columnList: action.payload,
                error: ''
            }

        case FETCH_COLUMNS_FAILURE:
            return {
                loading: false,
                columnList: [],
                error: action.payload
            }
        
        case SET_COLUMNS:
            return {
                ...state,
                columnList: action.payload
            }
        default:
            return state;
    }
}

export default ColumnReducer;