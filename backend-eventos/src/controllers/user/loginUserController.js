import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export default async function loginUserController(req, res) {
  const { email, pass } = req.body;

  if (!email || !pass) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
  }

  const user = await prisma.users.findFirst({
    where: { email, pass }
  });

  if (!user) {
    return res.status(401).json({ message: 'Usuário ou senha inválidos!' });
  }

  res.status(200).json({ message: 'Login realizado com sucesso!', user });
}
