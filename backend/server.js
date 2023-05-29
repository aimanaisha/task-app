require('dotenv').config();
const express = require('express')
const taskRoutes = require('./routes/taskRoutes')
const mongoose = require('mongoose')
const userRoutes = require('./routes/userRoutes')

// express app
const app = express()
 
//port
const port = process.env.PORT

//middleware
app.use(express.json())                 // data will be posted in json format

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()                                 //go to next middleware
})

//connect to db
mongoose.connect(process.env.URL)
    .then(() => {
        //listening for requests
        app.listen(port, () => {
        console.log(`connected to db &  listening on port ${port}`)
        })
    })
    .catch((err) => {
        console.log(err)
    })

// routes
app.use('/api/tasks', taskRoutes)
app.use('/api/user', userRoutes)