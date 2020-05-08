import React, { Component } from 'react'
import { Grid } from '@material-ui/core'
import { Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx';
import Message from './Message';


const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
      },
      fixedHeight: {
        margin: 20,
        height: 500,
      },
}));

export default function ChatBox() {
    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <div>
            <Grid container spacing ={3}>
                <Grid item xs={4} md={4} lg={4}>
                    <Paper className = {fixedHeightPaper}>
                        <Message />
                    </Paper>
                </Grid>
            </Grid>
        </div>
    )
    
}
