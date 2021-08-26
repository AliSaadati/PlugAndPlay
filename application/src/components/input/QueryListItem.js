import React from 'react'

import CancelIcon from '@material-ui/icons/Cancel';

import {
    TextField,
    IconButton,
    ListItem,
    Switch,
    Select,
    MenuItem,
    Input
} from "@material-ui/core";

const operatorMapping = {
    'equals': '=',
    'does not equal': '<>',
    'has': 'CONTAINS',
    'does not have': 'NOT CONTAINS',
    'less than': '<',
    'greater than': '>',
    'like': 'LIKE'
}

const QueryListItem = ({
    updateQueryHandler,
    query,
    closeButtonClickHandler,
    updateQuerySwitchHandler,
    style }) => {

    // const toggleSwitch = (id) => {
    //     updateQuerySwitchHandler(!isEnabled)
    //     setIsEnabled(prev => !prev)
    // }

    // const [isEnabled, setIsEnabled] = useState(query.enabled);
    
    let operatorSelectMenuItems = [];

    for (const [key, value] of Object.entries(operatorMapping)) {
        operatorSelectMenuItems.push(<MenuItem key={key} value={value}>{key}</MenuItem>)
    }

    return (
        <div style={style}>
            <ListItem
                style={{
                    display: 'flex',
                    padding: 0,
                    marginBottom: '1.5rem'
                }}>
                <IconButton
                    onClick={() => closeButtonClickHandler(query.id)}
                    color="secondary"
                >
                    <CancelIcon
                        name="remove"
                        fontSize="small"
                    />
                </IconButton>
                <div style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
                    <div style={{ width: '100%', display: 'flex' }}>
                        <TextField
                            style={{ marginRight: '1rem' }}
                            fullWidth
                            variant="standard"
                            placeholder="Select Field to Query on"
                            value={query.field_name}
                            onChange={(e) => updateQueryHandler(e, query.id)}
                            name="field_name"
                            disabled={!query.enabled}
                            InputProps={{
                                readOnly: true
                            }}
                        />
                        <Select
                            name="operator"
                            onChange={(e) => updateQueryHandler(e, query.id)}
                            value={query.operator}
                            style={{ width: '10rem' }}
                            displayEmpty
                            disabled={!query.enabled}
                            input={<Input name="circle" id={`operator-input-${query.id}`}
                                variant='outlined' />}
                        >
                            {operatorSelectMenuItems}
                        </Select>
                    </div>
                    <TextField
                        name='parameter'
                        onChange={(e) => updateQueryHandler(e, query.id)}
                        value={query.parameter}
                        fullWidth
                        variant="standard"
                        disabled={!query.enabled}
                        placeholder="Search parameter"
                    />
                </div>
                <Switch
                    name="enabled"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                    color="primary"
                    onChange={() => updateQuerySwitchHandler(!query.enabled, query.id)}
                    checked={query.enabled}
                />
            </ListItem>
        </div>
    )
}

export default QueryListItem;
