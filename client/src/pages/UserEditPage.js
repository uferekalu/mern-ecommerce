import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Controls } from '../components/controls/Controls';
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'
import { withStyles } from '@material-ui/core';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
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
    linkTxt: {
        marginBottom: '2rem',
        marginTop: '2rem',
        marginLeft: '0px',
        fontSize: '.9rem'
    },
    controlMargin: {
        marginBottom: '1rem'
    }
})

const UserEditPage = ({ match, history, classes }) => {
    const userId = match.params.id

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)

    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user } = userDetails

    const userUpdate = useSelector((state) => state.userUpdate)
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = userUpdate

    useEffect(() => {
        if (successUpdate) {
          dispatch({ type: USER_UPDATE_RESET })
          history.push('/admin/userlist')
        } else {
          if (!user.name || user._id !== userId) {
            dispatch(getUserDetails(userId))
          } else {
            setName(user.name)
            setEmail(user.email)
            setIsAdmin(user.isAdmin)
          }
        }
    }, [dispatch, history, userId, user, successUpdate])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({ _id: userId, name, email, isAdmin }))
    }

    return (
        <>
            <Link to='/admin/userlist'>
                <div>
                    <ThemeProvider theme={theme}>
                        <Typography variant="h5" className={classes.linkTxt}>Go Back</Typography>
                    </ThemeProvider>
                </div>
            </Link>
            <FormContainer>
                <ThemeProvider theme={theme}>
                    <Typography variant="h5" className={classes.registerTxt}>Edit User</Typography>
                </ThemeProvider>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message severity='error' title='Error'>{errorUpdate}</Message>}
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message severity='error' title='Error'>{error}</Message>
                ) : (
                    <form className={classes.root} onSubmit={submitHandler}>
                        <div className={classes.form}>
                            <Controls.Input
                                name="name"
                                variant="outlined"
                                label="Name"
                                fullWidth
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Controls.Input
                                name="email"
                                variant="outlined"
                                label="Email"
                                type="email"
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Controls.CheckboxLabels
                                name="isAdmin"
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                                color="primary"
                                label="Is Admin"
                                className={classes.controlMargin}
                            />
                            <Controls.Button
                                type="submit"
                                text="Update"
                                fullWidth
                                className={classes.controlMargin}
                            />
                        </div>
                    </form>
                )}
            </FormContainer>
        </>
    )

}

export default (withStyles(styles)(UserEditPage))