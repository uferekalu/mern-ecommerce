import React from 'react'
import Container from "@material-ui/core/Container"
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
    formGrid: {
        margin: 'auto'
    },
    marginCont: {
        marginTop: '4rem',
        backgroundColor: 'pink',
        marginBottom: '4rem'
    }
}));

const FormContainer = ({ children }) => {
    const classes = useStyles()

    return (
        <Container className={classes.marginCont}>
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6} className={classes.formGrid}>
                        <Paper className={classes.paper}>
                            {children}
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        </Container>
    )
}

export default FormContainer