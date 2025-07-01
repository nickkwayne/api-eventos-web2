import express from 'express'
import getEventController from '../controllers/events/getEventController.js'
import createEventController from '../controllers/events/createEventController.js'
import updateEventController from '../controllers/events/updateEventController.js'
import deleteEventController from '../controllers/events/deleteEventController.js'


const router = express.Router()

router.get('/list', getEventController )
router.post('/', createEventController)
router.put('/:id', updateEventController)
router.delete('/:id', deleteEventController)



export default router