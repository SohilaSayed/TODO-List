
import authRouter from './modules/auth/auth.router.js'
import userRouter from './modules/user/user.router.js'
import notesRouter from './modules/note/notes.router.js'
import connectDB from '../DB/connection.js'
import cors from 'cors'
import { globalErrHandling } from './utils/errorHandling.js'

const initApp = (app, express) => {
    
    app.use(express.json({}))
    app.use(cors({origin: true, credentials: true}))
    app.use('/auth', authRouter)
    app.use('/user', userRouter)
    app.use('/note', notesRouter)

    app.all("*",(req,res,next)=>{
        return res.json({message:"In-valid Method or URL or Both"})
    })

    app.use(globalErrHandling)
    connectDB()

}

export default initApp