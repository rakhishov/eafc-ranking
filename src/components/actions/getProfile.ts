import { revalidatePath, revalidateTag } from "next/cache"
import { prisma } from "../../../prisma/client"


async function getProfile(login: string){
    'use server'
    const player = await prisma.user.findUnique({
        where: {
            login: login
        }
    })
    return player
}
export default getProfile