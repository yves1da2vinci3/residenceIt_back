import express from 'express'
import {  registerResidence,
    updateResidence,
    getResidences,
    deleteResidence,
    getResidenceById,} from '../controllers/ResidenceController.js'
const router = express.Router()
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(protect, admin, registerResidence).get(getResidences)

router
  .route('/:residenceId').delete(protect, admin, deleteResidence).get(getResidenceById).put(protect, admin, updateResidence)









export default router
