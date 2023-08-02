import updateRanking from "@/components/functions/updateRanking"
import { prisma } from "../../../prisma/client";

async function addUser(formData: FormData): Promise<void>{
    'use server'
    const name = formData.get('name') as string
    const login = formData.get('login') as string
    const elo = parseInt(formData.get('elo') as string)
    
    const user = await prisma.user.create({
        data: {
            name: name,
            login: login,
            elo: elo
        },
    })
    
    updateRanking()
}

export default addUser