import express from 'express'
import session from 'express-session'
import mustacheExpress from 'mustache-express'
import path from 'path'

import { dirname } from "node:path"
import { fileURLToPath } from "node:url"

import localConfig from './config.js'
import errorHandle from './error.js'

//routes
import commentsRoute from './routes/CommentsRoute.js'
import loginRoute from './routes/LoginRoute.js'


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


const app = express()

//static file
app.use(express.static(path.join(__dirname,localConfig.path.static)))
app.use(express.urlencoded({ extended: false }))
//template
app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, localConfig.path.views));
app.use(session(localConfig.session))


app.use('/',commentsRoute)
app.use('/login',loginRoute)
//404 page
app.get('*',(req,res)=>{
    res.redirect('404.html')
})

//handle error
app.use(errorHandle.logErrors);
app.use(errorHandle.clientError);
app.use(errorHandle.errorHandler);


app.listen(localConfig.address.port,localConfig.address.host,()=>{
    console.log('Service is running on port',localConfig.address.port)
})

