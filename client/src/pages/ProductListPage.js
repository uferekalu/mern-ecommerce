import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import ConfirmDialog from '../components/ConfirmDialog';
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core';
import {
  listProducts,
  deleteProduct,
  createProduct,
} from '../actions/productActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants' 
import Grid from "@material-ui/core/Grid"
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButterToast, { Cinnamon } from 'butter-toast';
import { DeleteSweep } from '@material-ui/icons';
import { Controls } from '../components/controls/Controls'

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

const ProductListPage = ({ history, match, classes }) => {
    const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, title: '', subTitle: '' })
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const productList = useSelector((state) => state.productList)
    const { loading, error, products, page, pages } = productList

    const productDelete = useSelector((state) => state.productDelete)
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = productDelete

    const productCreate = useSelector((state) => state.productCreate)
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        product: createdProduct,
    } = productCreate

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET })

        if (!userInfo || !userInfo.isAdmin) {
            history.push('/login')
        }

        if (successCreate) {
            history.push(`/admin/product/${createdProduct._id}/edit`)
        } else {
            dispatch(listProducts('', pageNumber))
        }
    }, [
        dispatch,
        history,
        userInfo,
        successDelete,
        successCreate,
        createdProduct,
        pageNumber,
    ])

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

        dispatch(deleteProduct(id, onSuccess))
    }

    const createProductHandler = () => {
        dispatch(createProduct())
    }

    return (
        <>
            <Grid className='align-items-center'>
                <Grid>
                    <div>
                        <ThemeProvider theme={theme}>
                            <Typography variant="h5" className={classes.registerTxt}>Products</Typography>
                        </ThemeProvider>
                    </div>
                </Grid>
                <Grid className='text-right'>
                    <Controls.Button
                        type="submit"
                        text="Create product"
                        size="medium"
                        onClick={createProductHandler}
                    />
                </Grid>
            </Grid>
            {loadingDelete && <Loader />}
            {errorDelete && <Message severity='error' title='Error'>{errorDelete}</Message>}
            {loadingCreate && <Loader />}
            {errorCreate && <Message severity='error' title='Error'>{errorCreate}</Message>}
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell align="right">NAME</TableCell>
                                    <TableCell align="right">PRICE</TableCell>
                                    <TableCell align="right">CATEGORY</TableCell>
                                    <TableCell align="right">BRAND</TableCell>
                                    <TableCell align="right">ACTION</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {products.map((product) => (
                                    <TableRow key={product._id}>
                                    <TableCell component="th" scope="row">
                                        {product._id}
                                    </TableCell>
                                    <TableCell align="right">
                                        {product.name}
                                    </TableCell>
                                    <TableCell align="right">
                                        {product.price}
                                    </TableCell>
                                    <TableCell align="right">
                                        {product.category}
                                    </TableCell>
                                    <TableCell align="right">
                                        {product.brand}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Link to={`/admin/product/${product._id}/edit`}>
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
                                                    onConfirm: () => {deleteHandler(product._id)}
                                                })
                                            }}
                                        />
                                    </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Paginate pages={pages} page={page} isAdmin={true} />
                </>
            )}
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </>
    )
}

export default (withStyles(styles)(ProductListPage)) 