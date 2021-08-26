import {combineReducers} from 'redux';
import fieldReducer from './fieldReducer';
import viewReducer from './viewReducer';
import columnReducer from './columnReducer';
import queryReducer from './queryReducer';
import rowsReducer from './rowReducer';
import DialogReducer from './dialogReducer';

const allReducers = combineReducers({
    fields: fieldReducer,
    views: viewReducer,
    columns: columnReducer,
    querys: queryReducer,
    rows: rowsReducer,
    dialog: DialogReducer
})

export default allReducers;