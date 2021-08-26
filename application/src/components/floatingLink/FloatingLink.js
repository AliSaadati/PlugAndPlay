import React from 'react'
import theme from '../../theme'

import { makeStyles } from '@material-ui/core/styles'
import { Fab } from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles((theme) => ({
    floatingLink: {
        backgroundColor: theme.palette.primary.light,
        zIndex: 1300,
        position: 'fixed',
        bottom: '4rem',
        right: '1rem',
        [theme.breakpoints.up(700)]: {
            bottom: '1rem',
        }
    }
}))

function FloatingLink() {
    const classes = useStyles(theme);
    return (
        <Fab
            href="https://github.com/AliSaadati/PlugAndPlay-v2"
            color="primary"
            className={classes.floatingLink}>
            <GitHubIcon />
        </Fab>
    )
}

export default FloatingLink
