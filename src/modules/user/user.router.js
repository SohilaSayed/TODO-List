import { Router } from 'express'
import { auth } from '../../../middleware/auth.js'
import * as userController from './controller/user.js'
const router = Router()



router.get("/",auth,userController.getUsers)

router.put("/update",auth,userController.updateUser)

router.delete("/delete",auth,userController.deleteUser)




export default router