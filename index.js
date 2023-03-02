import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import initApp from './src/app.router.js'
const app = express()
const port = 5000 || 3000



initApp(app , express)

app.listen(port,
    () => console.log(`Server is Running on  ${port}!`))