import React, { useEffect, useState, useCallback } from 'react'
import ControlPointIcon from '@material-ui/icons/ControlPoint';

import {
    TextField,
    InputAdornment,
    IconButton,
    List
} from "@material-ui/core";
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from "@material-ui/core/styles"
import { fetchQuerys, setQuery, addQuery, removeQuery } from '../../actions/querys/queryActions'
import { useDispatch, useSelector } from 'react-redux';
import QueryListItem from '../input/QueryListItem'

const useStyles = makeStyles((theme) => ({
    cssLabel: {
        color: "#aaa"
    },
}))

export default function QueryMenuItem() {
    const dispatch = useDispatch();
    const classes = useStyles();

    const querys = useSelector(state => state.querys);
    const fields = useSelector(state => state.fields)
    const viewId = useSelector(state => state.views.currentView.id)

    const [newQueryInput, setNewQueryInput] = useState({
        id: 21,
        name: 'artist',
        type: 'varchar'
      });

    // Set up
    useEffect(() => {
        dispatch(fetchQuerys(viewId))
    }, [viewId, dispatch])

    // Event Handlers
    const addQueryClickHandler = (event) => {
            event.stopPropagation();
            dispatch(addQuery({ 
                field_name: newQueryInput.name, 
                field_id: newQueryInput.id, 
                type: newQueryInput.type 
            }))
    }

    const updateNewQueryInput = (event, val) => {
        setNewQueryInput(val);
    }

    // Memoized Functions
    const updateQueryHandler = useCallback((event, id) => {
        dispatch(setQuery({
            property: event.target.name,  
            value: event.target.value
        }, id))
    })

    const updateQuerySwitchHandler = useCallback((value, id) => {
        dispatch(setQuery({
            property: 'enabled',  
            value: value
        }, id))
    })

 const closeButtonClickHandler = (id) => {
     dispatch(removeQuery(id));
 }

    return (
        <>
            <Autocomplete
                id="add-query-select-box"
                options={fields.fieldRows}
                getOptionLabel={(option) => option.name}
                style={{ width: '100%', marginBottom: '1rem' }}
                disableClearable
                forcePopupIcon={false}
                defaultValue={fields.fieldRows[0]}
                onChange={updateNewQueryInput}
                renderInput={(params) => (
                    <TextField

                        {...params}
                        InputLabelProps={{
                            classes: {
                                root: classes.cssLabel
                            }
                        }}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment:
                                <InputAdornment position='end'>
                                    <IconButton
                                        onClick={addQueryClickHandler}
                                        edge="end"
                                        aria-label="comments">
                                        <ControlPointIcon
                                            htmlColor="#44acff"
                                            fontSize='medium' />
                                    </IconButton>
                                </ InputAdornment>
                        }}
                        fullWidth
                        variant="standard"
                        label="Add Field to Query on"
                    />
                )}
            />
            <List style={{ width: '100%', padding: 0 }}>
                {querys.queryList.map((query, index) => {
                    let style = index%2 === 1 ? {backgroundColor: '#fafafa'} : null;
                    return (
                        <QueryListItem
                            key={query.id}
                            updateQueryHandler={updateQueryHandler}
                            closeButtonClickHandler={closeButtonClickHandler}
                            updateQuerySwitchHandler={updateQuerySwitchHandler}
                            query={query}
                            style={style}
                        />
                    )
                })}
            </List>
        </>
    )
}
