import { prisma } from "../../../../prisma/client"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardTitle, CardContent, CardDescription, CardHeader, CardFooter } from "@/components/ui/card";
import { revalidatePath } from "next/cache";

export const dynamicParams = false
// export const revalidate = 15

export async function generateStaticParams() {
    const users = await prisma.user.findMany()
   
    return users.map((user) => ({
      login: user.login,
    }))
}

async function getProfile(login: string){
    'use server'
    const player = await fetch('http://localhost:3000/api/user?login='+login).
        then(res => res.json())
    revalidatePath('/profile/[login]')
    return player
} 

export default async function Page({params}:{   
    params: {login: string}
}){
    
    const profile = await getProfile(params.login) as any
    return (
        <div className="flex justify-evenly mt-10">
            <Card className="w-[350px] bg-cardColor base:p-6 block py-7 rounded-20">
                <div className="px-8">
                <div className="relative mb-2 flex justify-center">
                    <img className="rounded-full border border-gg-dark-3 bg-gg-dark-3 object-cover h-[150px] w-[150px]"
                        src="https://tse1.mm.bing.net/th?q=anime%20chill%20pfp"
                    />
                </div>
                
                <CardHeader>
                    <h1 className="min-w-[1px] truncate text-center text-[24px] font-semibold leading-[34px]">{profile.login}</h1>
                    <p className="min-w-[1px] truncate text-center text-small leading-[20px] font-medium ">{profile.name}</p>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4 pt-2">
                        <div>
                            <a className="grid grid-cols-1 justify-center rounded border bg-darkColor px-4 py-3 text-center hover:bg-opacity-50 appearance-none cursor-pointer group relative transition"
                                title="Ranking"
                                href="/ranking"

                            >
                                <p className="flex items-center justify-center gap-1 font-semibold leading-[20px]">#{profile.id}</p>
                                <p className="text-2xs font-bold uppercase leading-[20px]">RANK</p>
                            </a>
                        </div>
                        <div>
                        <a className="grid grid-cols-1 justify-center rounded border bg-darkColor px-4 py-3 text-center hover:bg-opacity-50 appearance-none cursor-pointer gg-theme--default gg-theme-misc--default gg-theme-variant--default group relative transition ng-star-inserted"
                                title="Points"
                                href="/ranking"

                            >
                                <p className="flex items-center justify-center gap-1 font-semibold leading-[20px]">{profile.elo}</p>
                                <p className="text-2xs font-light uppercase leading-[20px]">POINTS</p>
                            </a>
                        </div>
                    </div>
                </CardContent>
                </div>
            </Card>
        </div>
    )
    
}