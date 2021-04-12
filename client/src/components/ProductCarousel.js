import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Carousel from "react-material-ui-carousel"
import { Link } from 'react-router-dom'
import './style/Example.scss';
import Loader from './Loader'
import Message from './Message'
import { listTopProducts } from '../actions/productActions'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 590,
    margin: 'auto'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  contentPrice: {
    float: 'right',
    color: 'black'
  },
  contentName: {
    color: 'black',
    textDecoration: 'none'
  }
}));

const ProductCarousel = () => {
    const classes = useStyles();
    const [autoPlay, setAutoPlay] = useState(true)
    const [animation, setAnimation] = useState("fade")
    const [indicators, setIndicators] = useState(true)
    const [timeout, setTimeout] = useState(500)
    const [navButtonsAlwaysVisible, setNavButtonsAlwaysVisible] = useState(false)
    const [navButtonsAlwaysInvisible, setNavButtonsAlwaysInvisible] = useState(false)
    const [cycleNavigation, setCycleNavigation] = useState(true)
    
    const dispatch = useDispatch()

    const productTopRated = useSelector((state) => state.productTopRated)
    const { loading, error, products } = productTopRated

    useEffect(() => {
        dispatch(listTopProducts())
    }, [dispatch])

    return loading ? (
        <Loader />
      ) : error ? (
        <Message severity='error' title='Error'>{error}</Message>
      ) : (
        <div style={{ marginTop: "50px", color: "#494949" }}>
            <h2>Modern Wears!</h2>

            <Carousel
                className="Example"
                autoPlay={autoPlay}
                animation={animation}
                indicators={indicators}
                timeout={timeout}
                cycleNavigation={cycleNavigation}
                navButtonsAlwaysVisible={navButtonsAlwaysVisible}
                navButtonsAlwaysInvisible={navButtonsAlwaysInvisible}
                next={(now, previous) => console.log(`Next User Callback: Now displaying child${now}. Previously displayed child${previous}`)}
                prev={(now, previous) => console.log(`Prev User Callback: Now displaying child${now}. Previously displayed child${previous}`)}
                onChange={(now, previous) => console.log(`OnChange User Callback: Now displaying child${now}. Previously displayed child${previous}`)}
            >
                {
                    products.map((product) => {
                        return (
                            <Card className={classes.root} key={product._id}>
                              <Link to={`/product/${product._id}`}>
                                <CardMedia
                                  className={classes.media}
                                  image={product.image}
                                  title={product.name}
                                />
                                <CardContent className={classes.carouselInfo}>
                                  <Typography 
                                    variant="body2" 
                                    color="textSecondary" 
                                    component="p"
                                    className={classes.contentPrice}
                                  >
                                    ${product.price}
                                  </Typography>
                                  <Typography 
                                    variant="body2" 
                                    color="textSecondary" 
                                    component="p"
                                    className={classes.contentName}
                                  >
                                    {product.name}
                                  </Typography>
                                  
                                </CardContent>
                              </Link>
                            </Card>
                        )
                    })
                }
            </Carousel>

        </div>
      )
    
}

export default ProductCarousel