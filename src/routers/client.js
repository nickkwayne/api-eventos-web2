import express from 'express'
import getUserController from '../controllers/user/getclientController.js'

const router = express.Router()

router.get('/:id', getclientController)
//...continua

export default router