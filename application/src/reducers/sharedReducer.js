import {
    FETCH_DATA_REQUEST, 
    FETCH_DATA_SUCCESS, 
    FETCH_DATA_FAILURE,
    SET_CURRENT_VIEW
} from '../actions/shared/sharedTypes';

const initialState = {
    loading: false,
    sharedList: [],
    currentShared: {},
    error: ''
}

const SharedReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DATA_REQUEST:
            
            return {
                ...state,
                loading: true
            
        }

        case FETCH_DATA_SUCCESS:
            return {
                ...state,
                loading: false,
                sharedList: action.payload,
                error: ''
            }

        case FETCH_DATA_FAILURE:
            return {
                ...state,
                loading: false,
                sharedList: [],
                error: action.payload
            }

        default:
            return state;
        
    }
}

export default SharedReducer;