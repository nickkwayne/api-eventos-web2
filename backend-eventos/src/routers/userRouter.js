import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import express from "express";
import createUserController from "../controllers/user/createUserController.js";
import updateUserController from "../controllers/user/updateUserController.js";
import getUserController from "../controllers/user/getUserController.js";
import deleteUserController from "../controllers/user/deleteUserController.js";

const router = express.Router();

router.post("/", createUserController);
router.put("/:id", updateUserController);
router.get("/list", getUserController);
router.delete("/:id", deleteUserController);

export default router;

// login de usuário
router.post('/login', async (req, res) => {
  const { email, pass } = req.body;

  try {
    const user = await prisma.users.findFirst({ where: { email, pass } });

    if (!user) {
      return res.status(401).json({ message: 'Email ou senha inválidos' });
    }

    res.json({ message: 'Login de usuário bem-sucedido!', user });
  } catch (error) {
    res.status(500).json({ message: 'Erro no login do usuário', error });
  }
});
