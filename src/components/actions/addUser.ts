'use server'
import updateRanking from "@/components/actions/updateRanking"
import { prisma } from "../../../prisma/client";
import { redirect } from 'next/navigation';
import { revalidatePath } from "next/cache";


async function addUser(formData: FormData): Promise<void>{  
    const name = formData.get('name') as string
    const login = formData.get('login') as string
    const elo = parseInt(formData.get('elo') as string)
    const urllink = formData.get('link') as string
    const user = await prisma.user.create({
        data: {
            name: name,
            login: login,
            elo: elo,
            avatarLink: urllink
        },
    })
    updateRanking()
    revalidatePath('/ranking')
}

export default addUser