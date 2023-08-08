'use server'
import { prisma } from "../../../prisma/client"

async function getUsers(){
    const users = await prisma.user.findMany({
        orderBy: {
            elo: 'desc'
        }
    })
    return users
}

export default getUsers