import { Router } from 'express'
import { validation } from '../../../middleware/validation.js'
import { loginSchema, signUpSchema } from './auth.validation.js'
import { auth } from '../../../middleware/auth.js'

import * as authController from './controller/auth.js'
const router = Router()



router.post("/signUp",validation(signUpSchema),authController.signUp)

router.post("/login",validation(loginSchema),authController.login)

router.get("/logout",auth,authController.logout)




export default router