import express from 'express'
import createEnterpriseController from '../controllers/enterprise/createEnterpriseController.js'





const router = express.Router()
router.post('/', createEnterpriseController)

export default router