import {
    FETCH_QUERYS_REQUEST,
    FETCH_QUERYS_SUCCESS,
    FETCH_QUERYS_FAILURE,
    SET_QUERY,
    ADD_QUERY,
    REMOVE_QUERY
} from '../actions/querys/queryTypes';

const initialState = {
    loading: true,
    queryList: [],
    error: ''
}

const QueryReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_QUERYS_REQUEST:

            return {
                ...state,
                loading: true

            }

        case FETCH_QUERYS_SUCCESS:
            return {
                loading: false,
                queryList: action.payload,
                error: ''
            }

        case FETCH_QUERYS_FAILURE:
            return {
                loading: false,
                queryList: [],
                error: action.payload
            }

        case SET_QUERY:
            {   
                const newQueryList = state.queryList.map(query => {
                    if (query.id === action.payload.id)
                        return { ...query, [action.payload.property]: action.payload.value }
                    else return query
                })
                return {
                    ...state,
                    queryList: newQueryList
                }
            }

        case ADD_QUERY:
            {
                let min = 0;
                for (let i = 0; i < state.queryList.length; i++) {
                    min = Math.min(min, state.queryList[i].id)
                }

                const newQueryList = [{
                    id: min-1,
                    operator: '=',
                    parameter: '',
                    enabled: true,
                    type: action.payload.type,
                    field_name: action.payload.field_name,
                    field_id: action.payload.field_id
                }, ...state.queryList]
                return {
                    ...state,
                    queryList: newQueryList
                }
            }
        case REMOVE_QUERY:
            {
                const newQueryList = state.queryList
                    .filter(query => query.id !== action.payload.id)

                return {
                    ...state,
                    queryList: newQueryList
                }
            }
        default:
            return state;
    }
}

export default QueryReducer;