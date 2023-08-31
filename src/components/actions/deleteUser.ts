'use server'
import updateRanking from "@/components/actions/updateRanking"
import { prisma } from "../../../prisma/client";
import { revalidatePath } from "next/cache";


async function deleteUser(id: number): Promise<void>{  
    const deletedUser = await prisma.user.delete({
        where: {
            id: id
        }
    })
    updateRanking()
    revalidatePath('/ranking')
}

export default deleteUser;