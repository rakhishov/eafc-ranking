import { prisma } from "../../../prisma/client";

async function getSocials(id: string){
    'use server'
    const user = await prisma.user.findUnique({
        where:{
            id: parseInt(id)
        },
        select:{
            login: true
        }
    })

    const socials = await prisma.socialLink.findMany({
        where: {
            userLogin: user?.login
        },
        select:{
            telegram: true,
            instagram: true,
        }
    })
    return socials;
}

export default getSocials;