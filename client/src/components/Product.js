import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ProductRating from './ProductRating'

const useStyles = makeStyles({
    root: {
      maxWidth: 270,
    },
    media: {
      height: 140,
    },
    productName: {
        textDecoration: 'none',
        textTransform: 'capitalize'
    }
});


const Product = ({ product }) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <Link to={`/product/${product._id}`}>
                    <CardMedia
                        className={classes.media}
                        image={product.image}
                        title="Contemplative Reptile"
                    />
                </Link>
                <CardContent>
                    <Link to={`/product/${product._id}`}>
                        <Typography gutterBottom variant="h6" component="h2">
                            <strong className={classes.productName}>{product.name}</strong>
                        </Typography>
                    </Link>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {product.description}
                        </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    ${product.price}
                </Button>
                <Button size="small" color="primary">
                    {product.category}
                </Button>
                <Button size="small" color="primary">
                    <ProductRating
                        value={product.rating}
                        text={`${product.numReviews} reviews`}
                    />
                </Button>
            </CardActions>
        </Card>
    )
}

export default Product;