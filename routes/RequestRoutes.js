import express from 'express'
import {registerMessage,getMessages,getMessageById,
    registerResquest,GetResquestByUser,DenyRequest,validateRequest,getRequests
} from '../controllers/RequestController.js'
import {protect,admin} from '../middleware/authMiddleware.js'
const router = express.Router()

router.route("/message").get(protect,admin,getMessages).post(protect, registerMessage)
router.get("/message/:id",protect,admin,getMessageById)

router.route("/").post(registerResquest).get(protect,admin,getRequests)

router.route("/:id").get(GetResquestByUser)

router.post('/:id/validate',validateRequest)
router.post('/:id/deny',DenyRequest)



export default router
