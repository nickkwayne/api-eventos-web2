import express from 'express'
import createEventController from '../controllers/events/createEventController.js'





const router = express.Router()
router.post('/', createEventController)

export default router