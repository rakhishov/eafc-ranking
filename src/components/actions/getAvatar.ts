import { prisma } from "../../../prisma/client";

async function getAvatar(login: string){
    'use server'
    const avatar = await prisma.user.findUnique({
        where: {
            login: login
        },
        select:{
            avatarLink: true
        }
    })
    return avatar;
}

export default getAvatar