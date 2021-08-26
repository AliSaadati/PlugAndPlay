import {
    FETCH_VIEWS_REQUEST,
    FETCH_VIEWS_SUCCESS,
    FETCH_VIEWS_FAILURE,
    SET_CURRENT_VIEW,
    DELETE_VIEW_REQUEST,
    DELETE_VIEW_SUCCESS,
    DELETE_VIEW_FAILURE
} from '../actions/views/viewTypes';

const initialState = {
    loading: true,
    viewList: [],
    currentView: { id: 1, name: "default", type: "default" },
    error: ''
}

const ViewReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_VIEWS_REQUEST:

            return {
                ...state,
                loading: true

            }

        case FETCH_VIEWS_SUCCESS:
            return {
                ...state,
                loading: false,
                viewList: action.payload,
                error: ''
            }

        case FETCH_VIEWS_FAILURE:
            return {
                ...state,
                loading: false,
                viewList: [],
                error: action.payload
            }

        case SET_CURRENT_VIEW:
            return {
                ...state,
                currentView: action.payload
            }

        case DELETE_VIEW_REQUEST:

            return {
                ...state,
                loading: true

            }

        case DELETE_VIEW_SUCCESS:
            
            const newViewList = state.viewList.filter(view => view.id !== action.payload.id);

            return {
                ...state,
                loading: false,
                viewList: newViewList,
                error: ''
            }

        case DELETE_VIEW_FAILURE:
            return {
                ...state,
                loading: false,
                viewList: [],
                error: action.payload
            }
        default:
            return state;

    }
}

export default ViewReducer;