import { prisma } from "../../../prisma/client";

async function getPlayerId(login: string){
    'use server'
    const avatar = await prisma.user.findUnique({
        where: {
            login: login
        },
        select:{
            id: true
        }
    })
    return avatar;
}

export default getPlayerId