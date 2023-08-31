'use server'
import { prisma } from "../../../prisma/client"

async function getUsers(){
    const users = await prisma.user.findMany({
        orderBy: {
            rank: 'asc'
        }
    })
    return users
}

export default getUsers