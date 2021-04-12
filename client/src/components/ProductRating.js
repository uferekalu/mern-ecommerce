import React from 'react'
import Rating from '@material-ui/lab/Rating';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      '& > * + *': {
        marginTop: theme.spacing(1),
      },
    },
}));

const ProductRating = ({ value, text, color }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <span>
                {
                    value >= 1
                    ? 
                        <Rating 
                            name="size-small" 
                            defaultValue={value} 
                            size="small" 
                            style={{ color }}
                        />
                    : value >= 0.5
                    ? 
                            <Rating 
                            name="size-small" 
                            defaultValue={value+=.5} 
                            size="small" 
                            precision={0.5}
                            style={{ color }}
                        />
                    : 
                        <Rating 
                        name="size-small" 
                        defaultValue={value} 
                        size="small" 
                        style={{ color }}
                    />
                }
            </span>
            <span>{text && text}</span>
        </div>

    )
}


Rating.defaultProps = {
    color: '#f8e825',
}

export default ProductRating