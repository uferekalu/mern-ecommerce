import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';
import { Controls } from '../components/controls/Controls';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            marginBottom: '2rem'
        },
        '& .MuiTypography-h5': {
            fontWeight: '400',
            fontSize: '1rem',
            marginRight: '.6rem',
            fontStyle: 'italics'
        },
        '& .MuiButton-root': {
            marginBottom: '2rem'
        },
        '& .MuiGrid-root': {
            display: 'flex',
            flexWrap: 'wrap',
            marginBottom: '2rem'
        }
    },
    form: {
        marginTop: '2rem',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    registerTxt: {
        fontWeight: 'bold',
        marginLeft: '0px'
    },
    loginRdt: {
        textDecoration: 'none',
        color: 'black',
        
    }
})

const LoginPage = ({ location, history, classes }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <FormContainer>
            <div>
                <ThemeProvider theme={theme}>
                    <Typography variant="h5" className={classes.registerTxt}>Sign In</Typography>
                </ThemeProvider>
            </div>
            {error && <Message severity='error' title='Error'>{error}</Message>}
            {loading && <Loader />}
            <form autoComplete="off" noValidate className={classes.root} onSubmit={submitHandler}>
                <div className={classes.form}>
                    <Controls.Input
                        name="email"
                        variant="outlined"
                        label="Email Address"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Controls.Input
                        name="password"
                        variant="outlined"
                        label="Enter Password"
                        type="password"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Controls.Button
                        type="submit"
                        text="Sign In"
                        fullWidth
                    />
                    <Grid>
                        <ThemeProvider theme={theme}>
                            <Typography variant="h5">Don't have an Account?{' '}</Typography>
                        </ThemeProvider>
                        <Link to={redirect ? `/register?redirect=${redirect}` : '/register'} className={classes.loginRdt}>
                            Register
                        </Link>
                    </Grid>
                </div>
            </form>
        </FormContainer>
    )
}

export default (withStyles(styles)(LoginPage))