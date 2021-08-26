import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { closeDialog, saveDialog } from '../../actions/dialog/dialogActions';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
const SaveDialog = () => {

    const dispatch = useDispatch();
    const { open, title, value } = useSelector(state => state.dialog)
    const views = useSelector(state => state.views)
    const [saveDisabled, setSaveDisabled] = useState(false);
    const [saveViewInputMessage, setSaveViewInputMessage] = useState('Choose a unique view name.');
    const [dialogValue, setDialogValue] = useState({name:value.name, type:value.type})

    // Submit Dialog
    const handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();

        dispatch(saveDialog(dialogValue))
    };

    // Close Dialog
    const handleClose = () => {
        setDialogValue({
            name: '',
            type: '',
        });

        dispatch(closeDialog());
    };
    useEffect (() => {
        setDialogValue({name:value.name, type:value.type})
    }, [value])

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <form onSubmit={handleSubmit}>
                <DialogTitle id="form-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    Choose a view Name and Type
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
                                setSaveViewInputMessage('Choose a unique view name.')
                            } else {
                                setSaveDisabled(false);
                                setSaveViewInputMessage('Choose a unique view name.')
                            }
                        }}
                        label="name"
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
        </Dialog>
    )
}

export default SaveDialog
