import { Router } from 'express'
import { auth } from '../../../middleware/auth.js'
import * as notesController from './controller/notes.js'
const router = Router()




router.get("/",auth,notesController.getnotes)

router.get("/ByName/:title",auth,notesController.getnotesByName)

router.post("/add",auth,notesController.addPro)

router.put("/update/:id",auth,notesController.updatePro)

router.put("/updateAll",auth,notesController.updateAllPro)

router.delete("/delete/:id",auth,notesController.deletePro)

router.delete("/deleteAll",auth,notesController.deleteAllPro)


export default router