import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import { TextField, InputAdornment } from "@material-ui/core";

import { Search as SearchIcon } from "@material-ui/icons"
import { fetchColumns, setColumns } from '../../actions/columns/columnActions';
import { addQuery } from '../../actions/querys/queryActions';

const useStyles = makeStyles((theme) => ({
    textField: {
        marginBottom: '1.75rem'
    },
    list: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        maxHeight: '6rem',
        overflow: 'auto',
        paddingTop: 0
    },
    listItem: {
        maxHeight: '2rem',
        display: 'flex'
    },
    listItemAll: {
        backgroundColor: '#f9f9f9',
        maxHeight: '3rem',

        '&:hover, &:focus': {
            backgroundColor: '#ebebeb',
        },
    },
    listItemText: {
        fontWeight: 'bold'
    }
}));

export default function QueryMenuItem() {

    const classes = useStyles();
    const dispatch = useDispatch();

    const fields = useSelector(state => state.fields)
    const columns = useSelector(state => state.columns);
    const viewId = useSelector(state => state.views.currentView.id)

    const [checked, setChecked] = useState([]);
    const [fieldFilter, setFieldFilter] = useState('')

    useEffect(() => {
        dispatch(fetchColumns(viewId))
    }, [viewId, dispatch])

    useEffect(() => {
        const columnSorted = columns.columnList.slice().sort();
        if (checked.length !== columns.columnList.length ||
            !checked.slice().sort().every((value, index) => {
                return value === columnSorted[index]
            }))

            setChecked(columns.columnList)
    }, [columns])

    useEffect(() => {
        const columnSorted = columns.columnList.slice().sort();
        if (checked.length !== columns.columnList.length ||
            !checked.slice().sort().every((value, index) => {
                return value === columnSorted[index]
            })) {

            dispatch(setColumns(checked))
        }
    }, [checked, dispatch])

    const fieldList = fields.fieldRows;

    const handleChange = event => {
        setFieldFilter(event.target.value);
    };

    const handleToggle = (value) => () => {
        const currentIndex = checked.findIndex(i => i.name === value.name)
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleToggleAll = () => {
        const newChecked = [];
        if (checked.length !== fieldList.length) {
            for (let s of fieldList) {
                newChecked.push(s)
            }
        }
        setChecked(newChecked);
    }

    const addQueryClickHandler = (event, value) => {
        event.stopPropagation();
        dispatch(addQuery({
            field_name: value.name,
            field_id: value.id,
            type: value.type
        }))
    }

    return (
        <>
            <TextField
                style={{ width: '100%' }}
                size="small"
                id="standard-basic"
                placeholder='Search Field Name'
                // inputProps={{
                //     style: { fontSize: 14 }
                // }}
                InputProps={{
                    endAdornment:
                        <InputAdornment position='end'>
                            <SearchIcon fontSize='small' />
                        </ InputAdornment>
                }}
                InputLabelProps={{ shrink: false }}
                value={fieldFilter}
                onChange={handleChange}
                className={classes.textField}
            />
            <ListItem

                role={undefined}
                dense
                button
                onClick={handleToggleAll}
                className={classes.listItemAll}>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={checked.length === fieldList.length}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': 'All Fields' }}
                        color="secondary"
                    />
                </ListItemIcon>
                <ListItemText
                    classes={{ primary: classes.listItemText }}
                    id={'All Fields'}
                    primary={'Toggle All Fields'} />
            </ListItem>
            <List className={classes.list}>

                {fieldList.filter((value) =>
                    value.name.toLowerCase().includes(fieldFilter.toLowerCase())
                ).map((value) => {
                    const labelId = `checkbox-list-label-${value}`;
                    return (
                        <ListItem
                            key={value.name}
                            role={undefined}
                            dense
                            button
                            onClick={handleToggle(value)}
                            className={classes.listItem}>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={checked.findIndex(i => i.name === value.name) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                    color="primary"
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={value.name} />
                            <ListItemSecondaryAction >
                                <IconButton
                                    edge="end"
                                    aria-label="comments"
                                    onClick={(event) => addQueryClickHandler(event, value)}
                                >
                                    <ControlPointIcon
                                        htmlColor="#44acff" />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    );
                })}
            </List>
        </>
    )
}

