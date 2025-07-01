import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

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

// login de empresa
router.post('/login', async (req, res) => {
  const { cnpj, pass } = req.body;

  try {
    const empresa = await prisma.enterprise.findFirst({ where: { cnpj, pass } });

    if (!empresa) {
      return res.status(401).json({ message: 'CNPJ ou senha inválidos' });
    }

    res.json({ message: 'Login de empresa bem-sucedido!', empresa });
  } catch (error) {
    res.status(500).json({ message: 'Erro no login da empresa', error });
  }
});
