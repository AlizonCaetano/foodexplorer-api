const AppError = require('./utils/AppError')
require('express-async-errors')
require('dotenv/config')

const express = require('express')
const app = express()
app.use(express.json())

const cors = require('cors')
app.use(cors())

const routes = require('./routes')
app.use(routes)

const database = require("./database/sqlite")

database()

const uploadConfig = require('./config/upload')
app.use('/files', express.static(uploadConfig.UPLOADS_FOLDER))

app.use((err, req, res, next)=> {
    if(err instanceof AppError){
        return res.status(err.statusCode).json({
            message: err.message,
            status: 'Client error'
        })
    }

    return res.status(500).json({
        message: err.message,
        status: 'Internal server error'
    })
})

const PORT = 3232
app.listen(PORT, console.log(`Server is running on port ${PORT}`))
