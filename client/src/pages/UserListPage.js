import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Controls } from '../components/controls/Controls';
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listUsers, deleteUser } from '../actions/userActions'
import ConfirmDialog from '../components/ConfirmDialog';
import ButterToast, { Cinnamon } from 'butter-toast';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { DeleteSweep } from '@material-ui/icons';
import Typography from '@material-ui/core/Typography';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const styles = theme => ({
    paper: {
        margin: theme.spacing(3),
        padding: theme.spacing(2),
    },
    registerTxt: {
        marginBottom: '2rem',
        marginTop: '2rem',
        fontWeight: 'bold',
        marginLeft: '0px'
    },
    table: {
        minWidth: 650,
    },
})

const UserListPage = ({ history, classes }) => {
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })

    const dispatch = useDispatch()

    const userList = useSelector((state) => state.userList)
    const { loading, error, users } = userList

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userDelete = useSelector((state) => state.userDelete)
    const { success: successDelete } = userDelete

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(listUsers())
        } else {
            history.push('/login')
        }
    }, [dispatch, history, successDelete, userInfo])

    const deleteHandler = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })

        const onSuccess = () => { 
            ButterToast.raise({
                content: <Cinnamon.Crisp title="Post Box"
                    content = "Deleted sucessfully"
                    scheme = {Cinnamon.Crisp.SCHEME_PURPLE}
                    icon = {<DeleteSweep />}
                />
            })
        }

        dispatch(deleteUser(id, onSuccess))
    }

    return (
        <>
            <div>
                <ThemeProvider theme={theme}>
                    <Typography variant="h5" className={classes.registerTxt}>Users</Typography>
                </ThemeProvider>
            </div>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message severity='error' title='Error'>{error}</Message>
            ) : (
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell align="right">NAME</TableCell>
                                <TableCell align="right">EMAIL</TableCell>
                                <TableCell align="right">ADMIN</TableCell>
                                <TableCell align="right">ACTION</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {users.map((user) => (
                            <TableRow key={user._id}>
                            <TableCell component="th" scope="row">
                                {user._id}
                            </TableCell>
                            <TableCell align="right">
                                {user.name}
                            </TableCell>
                            <TableCell align="right">
                                <Link to={`mailto:${user.email}`}>{user.email}</Link>
                            </TableCell>
                            <TableCell align="right">
                                {user.isAdmin ? (
                                    <CheckIcon style={{ color: 'green[500]' }} />
                                ) : (
                                    <CloseIcon style={{ color: 'red[500]' }} />
                                )}
                            </TableCell>
                            <TableCell align="right">
                                <Link to={`/admin/user/${user._id}/edit`}>
                                    <Controls.Button
                                        type="submit"
                                        text="Edit"
                                        size="small"
                                    />
                                </Link>
                                <Controls.Button 
                                    variant="contained"
                                    color="secondary"
                                    size="small"
                                    type="submit"
                                    text="Delete"
                                    onClick={() => {
                                        setConfirmDialog({
                                            isOpen: true,
                                            title: 'Are you sure to delete this record?',
                                            subTitle: "You can't undo this operation",
                                            onConfirm: () => {deleteHandler(user._id)}
                                        })
                                    }}
                                />
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </>
    )
}

export default (withStyles(styles)(UserListPage));