import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient


export const enterpriseValidator = (enterprise, partial = null) => {
    if(partial) {
        return enterpriseSchema.partial(partial).safeParse(enterprise)
    }
    return enterpriseSchema.safeParse(enterprise)
}

export async function create(enterprise) {
    const result = await prisma.enterprise.create({
        data: enterprise,
        select: {
            id: true,
            name: true,
            cnpj: true,
            email: true,
            pass: true

        }
    });

    console.log("ID:", enterprise.id);
    
}