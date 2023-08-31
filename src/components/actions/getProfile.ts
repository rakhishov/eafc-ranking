import { revalidatePath, revalidateTag } from "next/cache"
import { prisma } from "../../../prisma/client"


async function getProfile(id: string){
    'use server'
    const player = await prisma.user.findUnique({
        where: {
            id: parseInt(id)
        }
    })
    return player
}
export default getProfile