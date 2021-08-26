import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { makeStyles } from "@material-ui/core/styles"

import { useSelector, useDispatch } from 'react-redux';
import { setCurrentView } from '../../actions/views/viewActions';
import { openDialog } from '../../actions/dialog/dialogActions'
const filter = createFilterOptions();

const useStyles = makeStyles(() => ({
  cssLabel: {
    color: "#aaa"
  },
}))

export default function FreeSoloCreateOptionDialog() {
  const classes = useStyles();
  const dispatch = useDispatch();

  // Global State
  const views = useSelector(state => state.views);

  // Local State
  const [autocompleteValue, setAutocompleteValue] = useState({ name: views.currentView.name, type: views.currentView.type });




  useEffect(() => {
    if (views.currentView.name !== autocompleteValue.name) {
      setAutocompleteValue({ name: views.currentView.name, type: views.currentView.type });
    }
  }, [views.currentView])

  return (
    <>
      <Autocomplete
        size='small'
        value={autocompleteValue}
        onChange={(event, newValue) => {
          // value other than one from the dropdown is pressed "Enter" on
          if (typeof newValue === 'string') {

            // Timeout needed to prevent dialog box from instantly validating
            setTimeout(() => {
              dispatch(openDialog({
                title: "Add a new View",
                value: {
                  name: newValue,
                  type: "default"
                },
                saveType: "new"
              }))
            })

            // "Add" button is clicked on from dropdown
          } else if (newValue && newValue.inputValue) {
            dispatch(openDialog({
              title: "Add a new View",
              value: {
                name: newValue.inputValue,
                type: "default"
              },
              saveType: "new"
            }))

            // value from list is chosen
          } else if (newValue) {
            setAutocompleteValue(newValue);
            dispatch(setCurrentView(newValue));
          }

        }}

        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== '' && !views.viewList.map(view => view.name).includes(params.inputValue)) {
            filtered.push({
              inputValue: params.inputValue,
              name: `Add "${params.inputValue}"`,
            });
          }
          return filtered;
        }}

        id="view-dropdown"
        options={views.viewList}
        getOptionLabel={(option) => {
          // e.g value selected with enter, right from the input
          if (typeof option === 'string') {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.name;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(option) => option.name}
        style={{ width: '100%' }}
        freeSolo
        renderInput={(params) => (
          <TextField {...params}
            InputLabelProps={{
              classes: {
                root: classes.cssLabel
              }
            }}
            fullWidth
            label="Select or Create View"
            variant="standard" />
        )}
      />
      {/* <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <form onSubmit={handleSubmit}>
          <DialogTitle id="form-dialog-title">Add a new View</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please choose a View Name and View Category
            </DialogContentText>
            <TextField
              error={saveDisabled}
              autoFocus
              margin="dense"
              id="name"
              value={dialogValue.name}
              helperText={saveViewInputMessage}
              onChange={(event) => {
                setDialogValue({ ...dialogValue, name: event.target.value });
                if (views.viewList.map(view => view.name).indexOf(event.target.value) > -1) {
                  setSaveDisabled(true);
                  setSaveViewInputMessage('View name in use, choose another name.')
                } else if (event.target.value === '') {
                  console.log(event.target.value);
                  setSaveDisabled(true);
                } else {
                  setSaveDisabled(false);
                  setSaveViewInputMessage('Choose a unique view name.')
                }
              }}
              label="title"
              type="text"
            />
            <TextField
              margin="dense"
              id="type"
              value={dialogValue.type}
              onChange={(event) => setDialogValue({ ...dialogValue, type: event.target.value })}
              label="type"
              type="text"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button disabled={saveDisabled} type="submit" color="primary">
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog> */}
    </>
  );
}