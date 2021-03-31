const path = require('path')
const express = require('express')
const cors = require('cors');
const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors')
const connectDB = require('./config/db.js')
const { notFound, errorHandler } = require('./middleware/errorMiddleware.js')


// User routes
const userRoutes = require('./routes/userRoutes.js')
// Product routes
const productRoutes = require('./routes/productRoutes.js')
// Order routes
const orderRoutes = require('./routes/orderRoutes.js') 
// Upload routes
const uploadRoutes = require('./routes/uploadRoutes.js') 

dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === 'production') {
    app.use(morgan('dev'))
}

app.use(express.json())

// Users API
app.use('/api/users', userRoutes)
// Product API
app.use('/api/products', productRoutes)
// Order API
app.use('/api/orders', orderRoutes)
// Upload API
app.use('/api/upload', uploadRoutes)

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

if (process.env.NODE_ENV ==='production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', (req, res) => 
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
} else {
    app.get('/', (req, res) => {
        res.send('API is running...')
    })
}

app.use(notFound)
app.use(errorHandler)

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

const PORT = process.env.PORT || 5000

app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
    )
)