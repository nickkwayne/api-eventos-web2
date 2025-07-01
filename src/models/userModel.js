import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

//validação com Zod
const userSchema = z.object({
  id: z.number({
    required_error: 'O ID é obrigatório.',
    invalid_type_error: 'O ID deve ser um número.'
  }).positive({ message: 'O ID deve ser um número positivo.' }),

  cpf: z.string({
    required_error: 'O CPF é obrigatório.',
    invalid_type_error: 'O CPF deve ser um texto.'
  }).length(14, { message: 'O CPF deve ter exatamente 14 caracteres (formato: 000.000.000-00).' }),

  name: z.string({
    required_error: 'O nome é obrigatório.',
    invalid_type_error: 'O nome deve ser um texto.'
  }).min(3, { message: 'O nome deve ter no mínimo 3 caracteres.' })
    .max(100, { message: 'O nome deve ter no máximo 100 caracteres.' }),

  email: z.string({
    required_error: 'O e-mail é obrigatório.',
    invalid_type_error: 'O e-mail deve ser um texto.'
  }).email({ message: 'Formato de e-mail inválido.' })
    .max(255, { message: 'O e-mail deve ter no máximo 255 caracteres.' }),

  pass: z.string({
    required_error: 'A senha é obrigatória.',
    invalid_type_error: 'A senha deve ser um texto.'
  }).min(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
    .max(50, { message: 'A senha deve ter no máximo 50 caracteres.' }),

  gender: z.string({
    required_error: 'O gênero é obrigatório.',
    invalid_type_error: 'O gênero deve ser um texto.'
  }).min(1).max(3)
});


export const userValidator = (user, partial = null) => {
  if (partial) {
    return userSchema.partial(partial).safeParse(user);
  }
  return userSchema.safeParse(user);
};

//criação
export async function create(user) {
  const result = await prisma.users.create({
    data: user
  });
  return result;
}

//exclusão
export async function remove(id) {
  const result = await prisma.users.delete({
    where: { id }
  });
  return result;
}

//listagem
export async function getList() {
  const result = await prisma.users.findMany();
  return result;
}

//atualização
export async function update(id, user) {
  const result = await prisma.users.update({
    where: { id },
    data: user
  });
  return result;
}
