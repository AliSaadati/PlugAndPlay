import { fetchFields } from '../fields/fieldActions';
import { fetchViews } from '../views/viewActions';

export const initializeState = () => {
    return (dispatch) => {
        dispatch(fetchFields())
        .then(res => {
            console.log(res);
            dispatch(fetchViews());
        })
    }
}