import { PrismaClient } from '@prisma/client';
import { z } from 'zod'

const prisma = new PrismaClient()

const enterpriseSchema = z.object({
  id: z.number({
    required_error: 'O ID é obrigatório.',
    invalid_type_error: 'O ID deve ser um número.'
  }).positive({ message: 'O ID deve ser um número positivo.' }),

  name: z.string({
    required_error: 'O nome da empresa é obrigatório.',
    invalid_type_error: 'O nome deve ser um texto.'
  }).min(3, { message: 'O nome deve ter no mínimo 3 caracteres.' })
    .max(100, { message: 'O nome deve ter no máximo 100 caracteres.' }),

  cnpj: z.string({
    required_error: 'O CNPJ é obrigatório.',
    invalid_type_error: 'O CNPJ deve ser um número.'
  }).length(18, { message: 'O CNPJ deve ter exatamente 18 caracteres (formato: 00.000.000/0000-00).' }),

  email: z.string({
    required_error: 'O e-mail é obrigatório.',
    invalid_type_error: 'O e-mail deve ser um texto.'
  }).email({ message: 'Formato de e-mail inválido.' })
    .max(255, { message: 'O e-mail deve ter no máximo 255 caracteres.' }),

  pass: z.string({
    required_error: 'A senha é obrigatória.',
    invalid_type_error: 'A senha deve ser um texto.'
  }).min(6, { message: 'A senha deve ter no mínimo 6 caracteres.' })
    .max(100, { message: 'A senha deve ter no máximo 100 caracteres.' })
})


 export const enterpriseValidator = (enterprise, partial = null) => {
        if (partial){
            return enterpriseSchema.partial(partial).safeParse(enterprise)
        }
        return enterpriseSchema.safeParse(enterprise)
    }
 
    export async function create(enterprise){
        const result = await prisma.enterprise.create({
          data:enterprise
    })
    return result
}

export async function remove(id) {
    const result = await prisma.enterprise.delete({
        where: {
            id
        }
    })   
    return result 
}

export async function getList() {
    const result = await prisma.enterprise.findMany()
    return result
}

export async function update(id, enterprise){
    const result = await prisma.enterprise.update({
        where: {
            id
        },
        data: enterprise
    })
    return result
}