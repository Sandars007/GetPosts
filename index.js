const express = require('express')
require('dotenv').config()
const cors = require('cors')
const userRouter = require("./routes/userRoutes")
const postRouter = require('./routes/postRoutes')
const bodyParser = require("body-parser")
require('./utils/db')()




const app = express()
app.use(cors())
app.use(bodyParser.json())




app.use('/user',userRouter)
app.use('/post',postRouter)








app.listen(process.env.PORT,()=>{console.log(`The server is running at port ${process.env.PORT}`)})

