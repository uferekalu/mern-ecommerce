const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors')
const connectDB = require('./config/db.js')

// User routes
const userRoutes = require('./routes/userRoutes.js')

dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === 'production') {
    app.use(morgan('dev'))
}

app.use(express.json())

// Users API
app.use('/api/users', userRoutes)

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

const PORT = process.env.PORT || 5000

app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
    )
)