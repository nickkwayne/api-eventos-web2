import { PrismaClient } from "@prisma/client";
import { z } from 'zod';

const prisma = new PrismaClient();

const groupSchema = z.object({
  id: z.number({
    required_error: 'ID é obrigatório.',
    invalid_type_error: 'O ID deve ser um número.'
  }).positive({ message: 'O ID precisa ser um número positivo.' 
  }).optional(), // opcional para permitir a criação de novos grupos sem ID

  name: z.string({
    required_error: 'O nome do grupo é obrigatório.',
    invalid_type_error: 'O nome deve ser um texto.'
  })
  .min(3, { message: 'O nome deve ter no mínimo 3 caracteres.' })
  .max(255, { message: 'O nome deve ter no máximo 255 caracteres.' }),

  description: z.string({
    required_error: 'A descrição é obrigatória.',
    invalid_type_error: 'A descrição deve ser um texto.'
  })
  .min(10, { message: 'A descrição deve ter no mínimo 10 caracteres.' }),

  data: z.coerce.date({
    invalid_type_error: 'A data deve estar em um formato válido.'
  }).optional(),  // não será obrigatório pois aqui vai ser preenchido automaticamente na criação do grupo

creatorId: z.number({
    required_error: 'O ID do usuário é obrigatório.',
    invalid_type_error: 'O ID do usuário deve ser um número.'
  }).positive({ message: 'O ID do usuário deve ser um número positivo.' })
}).passthrough(); // permite que outros campos sejam passados sem validação (quero passar o eventsIDds e userIds)



export const groupValidator = (group, partial = null) => {
  if (partial) {
    return groupSchema.partial(partial).safeParse(group);
  }
  return groupSchema.safeParse(group);
};

export async function create(group) {
  const result = await prisma.group.create({
    data: group
  });
  return result;
}

export async function remove(id) {
  const result = await prisma.group.delete({
    where: { id }
  });
  return result;
}

export async function getList() {
  const result = await prisma.group.findMany({
    include: {
      events: true,
      users: true
    }
  });
  return result;
}
/*
export async function update(id, group) {
  const result = await prisma.group.update({
    where: { id },
    data: group
  });
  return result;
}
*/

export async function update(id, group) {
  const datatoUpdate = {
    name: group.name,
    description: group.description,
    data: group.data,
    creatorId: group.creatorId
  };

  if (group.eventIds && Array.isArray(group.eventIds)) {
    datatoUpdate.events = {
      connect: group.eventIds.map(eventId => ({ id: eventId }))
    };
  }

  if (group.userIds && Array.isArray(group.userIds)) {
    datatoUpdate.users = {
      connect: group.userIds.map(userId => ({ id: userId }))
    };
  }
  const result = await prisma.group.update({
    where: { id },
    data: datatoUpdate,
    include: {
      events: true,
      users: true
    }
  });

  return result;
}
