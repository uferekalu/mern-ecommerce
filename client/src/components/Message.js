import React from 'react'
import { makeStyles } from '@material-ui/core/styles/'
import Alert from '@material-ui/lab/Alert'
import AlertTitle from "@material-ui/lab/AlertTitle"

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const Message = ({ severity, title, children }) => {
    const classes = useStyles();

    return(
        <div className={classes.root}>
            <Alert severity={severity}>
                <AlertTitle>{title}</AlertTitle>
                {children}
            </Alert>
        </div>
    )
}

Message.defaultProps = {
    severity: 'info',
    title: 'Info',
}

export default Message;