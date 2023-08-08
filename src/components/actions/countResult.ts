'use server'
import { prisma } from "../../../prisma/client"
import elo from "../functions/elo"
import updateRanking from "./updateRanking"
import { redirect } from 'next/navigation';
import updateMatches from './updateMatches';
export default async function handleSubmit(formData: FormData): Promise<void>{
    const score1 = parseInt(formData.get('score1') as string)
    const score2 = parseInt(formData.get('score2') as string)
    const login1 = formData.get('login1') as string
    const login2 = formData.get('login2') as string
    const elo1: any = await prisma.user.findUnique({
        where: {
            login: login1
        },
        select:{
            elo: true
        }
    })
    const elo2: any = await prisma.user.findUnique({
        where: {
            login: login2
        },
        select:{
            elo:true
        }
    })
    const [newElo1, newElo2] = elo(elo1.elo, elo2.elo, score1, score2) as number[]
    await prisma.user.update({
            where: {
                login: login1,
            },
            data: {
                elo: newElo1
            }
    })
    
    await prisma.user.update({
            where: {
                login: login2,
            },
            data: {
                elo: newElo2
            }
    })
    updateMatches(login1, login2, score1, score2)
    updateRanking()

}