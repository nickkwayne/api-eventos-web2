import express from 'express'
import createEnterpriseController from '../controllers/enterprise/createEnterpriseController.js'
import deleteEnterpriseController from '../controllers/enterprise/deleteEnterpriseController.js' 
import updateEnterpriseController from '../controllers/enterprise/updateEnterpriseController.js'
import getEnterpriseController from '../controllers/enterprise/getEnterpriseController.js'




const router = express.Router()
router.post('/', createEnterpriseController)
router.delete('/:id', deleteEnterpriseController)
router.put('/:id', updateEnterpriseController)
router.get('/list', getEnterpriseController)

export default router