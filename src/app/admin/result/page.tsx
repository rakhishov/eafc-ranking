'use client'
import { Input } from "@/components/ui/input"
import { prisma } from "../../../../prisma/client"
import { NextResponse } from "next/server"
import { redirect } from 'next/navigation';
import elo from '../../../components/functions/elo'
import AsyncSelect from 'react-select/async';
import updateRanking from "@/components/functions/updateRanking";
import loadOptions from "@/components/functions/getUsers";



// async function handleSubmit(formData: FormData): Promise<void>{
//     'use server'
//     const score1 = parseInt(formData.get('score1') as string)
//     const score2 = parseInt(formData.get('score2') as string)
//     const login1 = formData.get('login1') as string
//     const login2 = formData.get('login2') as string
//     const elo1: any = await prisma.user.findUnique({
//         where: {
//             login: login1
//         },
//         select:{
//             elo: true
//         }
//     })
//     const elo2: any = await prisma.user.findUnique({
//         where: {
//             login: login2
//         },
//         select:{
//             elo:true
//         }
//     })
//     const [newElo1, newElo2] = elo(elo1.elo, elo2.elo, score1, score2) as number[]
//     await prisma.user.update({
//             where: {
//                 login: login1,
//             },
//             data: {
//                 elo: newElo1
//             }
//     })
    
//     await prisma.user.update({
//             where: {
//                 login: login2,
//             },
//             data: {
//                 elo: newElo2
//             }
//     })
//     updateRanking()
//     redirect(`/ranking`)

// }

export default function Result(){
    return(
        <div className="p-5 flex flex-col items-center  text-darkColor">
            <form>
                <div className='flex flex-row gap-4'>
                    <Input className="w-auto" type="text"  name="login1" />
                    <Input className="w-[45px]" type="number" defaultValue={0} name="score1"></Input>
                    <Input className="w-[45px]" type="number" defaultValue={0} name="score2"></Input>
                    <Input className="w-auto" type="text" name="login2" />
                    <button type="submit">Submit </button>
                </div>
                
            </form>
        </div>
        
    )
}

 