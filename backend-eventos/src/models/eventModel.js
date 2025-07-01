import { PrismaClient } from "@prisma/client";
import { z } from 'zod'

const prisma = new PrismaClient()

const eventSchema = z.object({

  id: z.number ({
        required_error: 'Id é obrigatório' ,
        invalid_type_error: 'O id deve ser um número.'
    })
    .positive ({message:'O ID precisa ser um número positivo.' }),

    name: z.string ({
        required_error: 'Nome é obrigatório.',
        invalid_type_error: 'O nome deve ser texto.'
    }),

    description: z.string ({
        required_error: 'Descrição do evento  é obrigatória.',
        invalid_type_error: 'A descrição deve conter apenas textos.'
    })
    .min(10, {message: "A descrição deve ter no minimo 10 caracteres."})
    .max(250, {message: "A descrição deve ter no máximo 250 caracteres"}),

    date: z.coerce.date ({
        required_error: 'A data do Evento é obrigatória.',
        invalid_type_error: 'A data deve ser válida (ex: DD-MM-AAAA)'
    }),

    accessibility: z.string ({
        required_error: 'Acessibilidade é obrigatório.',
        invalid_type_error: 'Acessibilidade deve ser em texto.'
    })
    .min(1, {message: "Acessibilidade deve ter no mínimo um caractere"})
    .max(3, {message: "Acessibilidade deve ter no máximo 3 caracteres"}),

    location: z.string ({
        required_error: 'A localização do Evento é obrigatória.',
        invalid_type_error: 'A localização deve ter números e texto'
    })
    .min(15, {message: "A localização deve ter no mínimo 15 caracteres"})
    .max(255, {message: "A localização deve ter no mínimo 255 caracteres"}),

    enterpriseId: z.number({
    required_error: 'O ID da empresa é obrigatório.',
    invalid_type_error: 'O ID da empresa deve ser um número.'
  }).positive({ message: 'O ID da empresa deve ser um número positivo.' })
})


    export const eventValidator = (events, partial = null) => {
        if (partial){
            return eventSchema.partial(partial).safeParse(events)
        }
        return eventSchema.safeParse(events)
    }
 
    export async function create(events){
        const result = await prisma.events.create({
          data:events
    })
    return result
}

export async function remove(id) {
    const result = await prisma.events.delete({
        where: {
            id
        }
    })   
    return result 
}

export async function getList() {
    const result = await prisma.events.findMany()
    return result
}

export async function update(id, event){
    const result = await prisma.events.update({
        where: {
            id
        },
        data: event
    })
    return result
}