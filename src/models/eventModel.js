import { PrismaClient } from "@prisma/client";
/*import { z } from 'zod'
import { partial } from "zod/v4-mini";*/

const prisma = new PrismaClient()

/*const eventSchema = z.object

  id: z.number ({
        required_error: 'Id é obrigatório' ,
        invalid_type_error: 'O id deve ser um número.'
    })
*/

    export const eventValidator = (events, partial = null) => {
        if (partial){
            return eventsSchema.partial(partial).safeParse(events)
        }
        return eventSchema.safeParse(events)
    }
 
    export async function create(events){
        const result = await prisma.events.create({
            data: events
        })
        return result
    }
