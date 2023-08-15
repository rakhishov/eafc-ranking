import { prisma } from "../../../prisma/client";

async function getSocials(login: string){
    'use server'
    const socials = await prisma.socialLink.findMany({
        where: {
            userLogin: login
        },
        select:{
            telegram: true,
            instagram: true,
        }
    })
    return socials;
}

export default getSocials;