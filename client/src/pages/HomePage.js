import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Grid from "@material-ui/core/Grid"
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'
import { listProducts } from '../actions/productActions'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    '&.makeStyles-media-44': {
      marginBottom: '.5rem'
    }
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  
  
}));

const HomePage = ({ match }) => {
    const classes = useStyles();

    const keyword = match.params.keyword

    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const productList = useSelector((state) => state.productList)
    const { loading, error, products, page, pages } = productList

    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber))
    }, [dispatch, keyword, pageNumber])

    return (
        <>
          <Meta />
          {!keyword ? (
            <ProductCarousel />
          ) : (
            <Link to='/' className='btn btn-light'>
              Go Back
            </Link>
          )}
          <h1>Latest Products</h1>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message severity='error' title='Error'>{error}</Message>
          ) : (
            <>
            <div className={classes.root}>
                <Grid id="top-row" container spacing={1} className={classes.gridCard}>
                  {products.map((product) => (
                    <Grid key={product._id} xs={6} sm={4} lg={3}>
                      <Product product={product} />
                    </Grid>
                  ))}
                </Grid>
                <Paginate
                  pages={pages}
                  page={page}
                  keyword={keyword ? keyword : ''}
                />
            </div>
            </>
          )}
        </>
    )
}

export default HomePage