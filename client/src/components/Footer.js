import React from 'react'
import Grid from "@material-ui/core/Grid"
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,    
    },
    footer: {
        marginTop: '11rem'
    }
}));

const Footer = () => {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <div className={classes.root}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        Copyright &copy; Lushak Ecommerce
                    </Paper>
                </Grid>
            </div>
        </footer>
    )
}

export default Footer
