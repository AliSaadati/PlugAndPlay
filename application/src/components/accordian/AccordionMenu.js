import React from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles"

import {
    ExpandMore as ExpandMoreIcon,
} from "@material-ui/icons"

import ViewMenuItem from './ViewMenuItem'
import FieldMenuItem from './FieldMenuItem'
import QueryMenuItem from './QueryMenuItem'

const useStyles = makeStyles((theme) => ({
    accordion: {
        height: '100%',
        padding: '.25rem .75rem'
    },
    accordionDetails: {
        flexWrap: 'wrap'
    },
    accordionContainer: {
        padding: '2rem'
    },
    heading: {
        fontWeight: 800,
        fontSize: '1rem',
        color: '#666'
    },

}));


export default function AccordionMenu() {

    const classes = useStyles();

    return (
        <>
            <Accordion
                className={classes.accordion}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}>
                    <Typography
                        className={classes.heading}>Views <span style={{fontWeight: 300}}>- add, delete and update views</span></Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.accordionDetails}>
                    <ViewMenuItem />
                </AccordionDetails>
            </Accordion>

            <Accordion className={classes.accordion}>

                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}>
                    <Typography
                        className={classes.heading}>Fields <span style={{fontWeight: 300}}>- table columns to display</span></Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.accordionDetails}>
                    <FieldMenuItem></FieldMenuItem>
                </AccordionDetails>
            </Accordion>

            <Accordion className={classes.accordion}>

                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}>
                    <Typography
                        className={classes.heading}>Queries <span style={{fontWeight: 300}}>- search parameters</span></Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.accordionDetails}>
                    <QueryMenuItem></QueryMenuItem>

                </AccordionDetails>
            </Accordion>
        </>
    )
}