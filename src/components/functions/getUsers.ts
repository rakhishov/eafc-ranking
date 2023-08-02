import { prisma } from "../../../prisma/client"

async function loadOptions(){
    'use server'
    const users = await prisma.user.findMany({
        select:{
            login: true
        }
    })
    return users
}

export default loadOptions