import { prisma } from "../../../prisma/client";


export default async function updateMatches(login1: string, login2: string, score1: number, score2: number){
    'use server'
    
    const result = score1 > score2 ? "1" : (score2>score1 ? "2" : "X")
    const match = await prisma.match.create({
        data: {
            score1: score1,
            score2: score2,
            player1login: login1,
            player2login: login2,
            result: result,
        }
    })
    if(result === '1'){
        await updateStatistics(login1, result)
        await updateStatistics(login2, '2')
    }
    else if(result === '2'){
        await updateStatistics(login1, '2')
        await updateStatistics(login2, '1')
    }
    else if(result === 'X'){
        await updateStatistics(login1, result)
        await updateStatistics(login2, result)
    }
}

async function updateStatistics(login: string, result: string){
    if(result === '1'){
        await prisma.user.update({
            where:{
                login: login
            },
            data:{
                wins: {
                    increment: 1
                }
            }
        })
    }

    else if(result === '2'){
        await prisma.user.update({
            where:{
                login: login
            },
            data:{
                losses: {
                    increment: 1
                }
            }
        })
    }

    else if(result === 'X'){
        console.log("login " + login)
        await prisma.user.update({
            where:{
                login: login
            },
            data:{
                draws: {
                    increment: 1
                }
            }
        })
    }
}