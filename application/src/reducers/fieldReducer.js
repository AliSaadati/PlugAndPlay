import {
    FETCH_FIELDS_REQUEST, 
    FETCH_FIELDS_SUCCESS, 
    FETCH_FIELDS_FAILURE
} from '../actions/fields/fieldTypes';

const initialState = {
    loading: true,
    fieldRows: [],
    error: ''
}

const FieldReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_FIELDS_REQUEST:
            
            return {
                ...state,
                loading: true
            
        }

        case FETCH_FIELDS_SUCCESS:
            return {
                loading: false,
                fieldRows: action.payload,
                error: ''
            }

        case FETCH_FIELDS_FAILURE:
            return {
                loading: false,
                fieldRows: [],
                error: action.payload
            }

        default:
            return state;
    }
}

export default FieldReducer;