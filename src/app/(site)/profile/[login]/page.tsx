import { prisma } from "../../../../../prisma/client"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardTitle, CardContent, CardDescription, CardHeader, CardFooter } from "@/components/ui/card";
import { revalidatePath } from "next/cache";
import Link from 'next/link'
import cultura from '../../../../../public/cultura.jpg'
import { FaInstagram, FaTelegram, FaTwitter } from 'react-icons/fa';



export const dynamicParams = false
// export const revalidate = 15
interface Game {
    matchID: number;
    player1login: string;
    player2login: string;
    score1: number;
    score2: number;
    result: string;
    date: string; // Should be a string representation of the date, not a Date object
  }
interface User{
        id: number;
        name: string;
        elo: number;
        login: string;
        rank: number;
        avatarLink: string;
        wins: number;
        losses: number;
        draws: number;
}
export async function generateStaticParams() {
    const users = await prisma.user.findMany()
   
    return users.map((user: User) => ({
      login: user.login,
    }))
}
export async function generateMetadata({ params }: any) {
    return {
      title: `Player ${params.login}`,
      description: `Profile of ${params.login}`,
    }
  }
async function getProfile(login: string){
    'use server'
    const player = await prisma.user.findUnique({
        where: {
            login: login
        }
    })
    revalidatePath('/profile/[login]')
    return player
} 

async function getMatches(login: string){
    'use server'
    const matches = await prisma.match.findMany({
        where: {
          OR: [
            { player1login: login },
            { player2login: login },
          ],
        },
      });
    const len = matches.length
    if(len>5){
        return matches.slice(len-5,len).reverse()
    }
    return matches.reverse()
}

async function getAvatar(login: string){
    'use server'
    const avatar = await prisma.user.findUnique({
        where: {
            login: login
        },
        select:{
            avatarLink: true
        }
    })
    return avatar;
}

async function getSocials(login: string){
    'use server'
    const socials = await prisma.socialLink.findMany({
        where: {
            userLogin: login
        },
        select:{
            telegram: true,
            instagram: true,
        }
    })
    return socials;
}

async function getStatistics(login: string){
    const player = await prisma.user.findUnique({
        where: {
            login: login
        }
    })
    let winrate: number = 0;
    if((player?.wins!=null) && (player.wins + player.draws + player.losses>0)){
        winrate = parseFloat((player?.wins/(player?.wins+player?.losses+player?.draws)*100).toFixed(2))
    }
    return(
        <div className="grid grid-cols-[auto,1fr] mb-5 bg-gray-800 rounded-2xl items-center gap-x-4 gap-y-6 rounded-20 p-6 md:grid-cols-[auto,1fr,auto] md:gap-6 appearance-none group relative transition">
            <div className="flex h-[80px] w-[80px] items-center">
                <img className="w-[80px] object-contain h-[80px]" src={cultura.src} alt="" />
            </div>
            <div className="grid grid-cols-1 gap-1">
                <h2 className="min-w-[1px] truncate font-semibold leading-[24px]"> Cultura</h2>
                <p className="text-tiny font-extralight leading-[16px]">Pavlodar</p>
            </div>
            <div className="col-span-2 flex items-center justify-center gap-10 md:col-span-1">
                <div className="grid grid-cols-1 gap-1">
                    <p className="flex items-center justify-center font-semibold leading-[24px]">
                        {player?.wins}
                    </p>
                    <p className="text-center text-sm font-medium leading-[16px] text-blue-700">
                        Wins
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-1">
                    <p className="flex items-center justify-center font-semibold leading-[24px]">
                        {player?.draws}
                    </p>
                    <p className="text-center text-sm font-medium leading-[16px] text-blue-700">
                        Draws
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-1">
                    <p className="flex items-center justify-center font-semibold leading-[24px]">
                        {player?.losses}
                    </p>
                    <p className="text-center text-sm font-medium leading-[16px] text-blue-700">
                        Losses
                    </p>
                </div>
                <div className="grid grid-cols-1 gap-1">
                    <p className="flex items-center justify-center font-semibold leading-[24px]">
                        {winrate}%
                    </p>
                    <p className="text-center text-sm font-medium leading-[16px] text-blue-700">
                        Winrate
                    </p>
                </div>
            </div>
        </div>
    )
}
function recentGames(games: Game[], pagePlayer: string){
    return games.map(async (game) => {
        const avatar1 = await getAvatar(game.player1login)
        const avatar2 = await getAvatar(game.player2login)
        return(
            <div key={game.matchID} className="group relative block w-full bg-gray-800 rounded-3xl mt-2 px-4 py-3 text-left focus-visible:outline-none appearance-none transition">
                <div className="grid auto-rows-[50px] grid-cols-[90px,1fr,90px] items-center gap-3 xl:grid-cols-[120px,1fr,120px]">
                    <div>{Date.parse(game.date).toLocaleString('en-GB')}</div>
                    <div className="grid auto-cols-[70px] grid-cols-[1fr,auto,1fr] items-center gap-3">
                        <div>
                            <div className="grid w-full items-center gap-3 grid-cols-[1fr,auto]">
                                <div className="flex h-10 w-10 items-center justify-center order-2 justify-self-end">
                                    <img loading="lazy" className="col-span-1 w-10 object-contain h-10 rounded-full border border-gg-dark-3 bg-gg-dark-3" src={avatar1?.avatarLink!=''? avatar1?.avatarLink : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt=""/>
                                </div>
                                <p className="min-w-[1px] truncate text-small font-medium leading-[20px] tracking-gg-wider text-gg-light-3 order-1 text-right"><Link href={`https://${location.host}/profile/${game.player1login}`}>{game.player1login}</Link> </p>
                            </div>
                           </div>
                        <div className="relative min-w-[90px]">
                            <div className="grid grid-cols-[1fr,auto,1fr] items-center justify-center transition gap-1">
                                <p className="text-lg font-extrabold uppercase leading-[24px] text-gg-light-3 text-right">
                                    {game.score1}
                                </p>
                                <div className="flex items-center text-center">
                                    <p className="text-lg font-extrabold uppercase leading-[24px]">
                                        :
                                    </p>
                                </div>
                                <p className="text-lg font-extrabold uppercase leading-[24px] text-left">
                                    {game.score2}
                                </p>
                            </div>
                        </div>
                        <div>
                            <div className="grid w-full items-center gap-3 grid-cols-[auto,1fr]">
                                <div className="relative flex h-10 w-10 items-center justify-center">
                                    <img loading="lazy" className="col-span-1 w-10 object-contain h-10 rounded-full border border-gg-dark-3 bg-gg-dark-3" src={avatar2?.avatarLink!=''? avatar2?.avatarLink : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} alt=""/>
                                </div>
                                <p className="min-w-[1px] truncate text-small font-medium leading-[20px] order-1 text-left">
                                    <Link href={`https://${location.host}}/profile/${game.player2login}`}>{game.player2login}</Link> 
                                </p>
                            </div>
                           </div>
                    </div>
                    <div className="justify-self-end">
                        <p className={`text-right text-xs font-bold uppercase leading-[10px] tracking-[0.05em] ${pagePlayer == game.player1login ? (game.result == '1' ? 'text-green-500' : (game.result == '2' ? 'text-red-500' : 'text-gray-400')) : (game.result == '2' ? 'text-green-500' : (game.result == '1' ? 'text-red-500' : 'text-gray-400')) } `}>
                            {pagePlayer == game.player1login ? (game.result == '1' ? 'Win' : (game.result == '2' ? 'Loss' : 'Draw')) : (game.result == '2' ? 'Win' : (game.result == '1' ? 'Loss' : 'Draw')) }
                        </p>
                    </div>
                </div>
            </div>
        )
    })
}

export default async function Page({params}:{   
    params: {login: string}
}){
    
    const profile = await getProfile(params.login) as any
    const matches = await getMatches(params.login) as any
    const socials = await getSocials(params.login) as any
    return (
        <div className="lg:flex justify-center gap-12 mt-10">
        <div className="lg:block xs:md:sm: flex justify-evenly">
            <Card className=" bg-cardColor base:p-6 block py-7 rounded-20">
            <div className="px-8">
                <div className="relative mb-2 flex justify-center">
                    <img alt="" className="rounded-full border border-gg-dark-3 bg-gg-dark-3 object-cover h-[150px] w-[150px]"
                        src={profile.avatarLink.length>0 ? profile.avatarLink : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
                    />
                </div>
                
                <CardHeader>
                    <h1 className="min-w-[1px] truncate text-center text-[24px] font-semibold leading-[34px]">{profile.login}</h1>
                    <p className="min-w-[1px] truncate text-center text-small leading-[20px] font-medium ">{profile.name}</p>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4 pt-2">
                        <div>
                            <a className="grid grid-cols-1 justify-center rounded border bg-gray-800 px-4 py-3 text-center hover:bg-opacity-50 appearance-none cursor-pointer group relative transition"
                                title="Ranking"
                                href="/ranking"

                            >
                                <p className="flex items-center justify-center gap-1 font-semibold leading-[20px]">#{profile.rank}</p>
                                <p className="text-2xs font-light uppercase leading-[20px]">RANK</p>
                            </a>
                        </div>
                        <div>
                        <a className="grid grid-cols-1 justify-center bg-gray-800 rounded border px-4 py-3 text-center hover:bg-opacity-50 appearance-none cursor-pointer gg-theme--default gg-theme-misc--default gg-theme-variant--default group relative transition ng-star-inserted"
                                title="Points"
                                href="/ranking"

                            >
                                <p className="flex items-center justify-center gap-1 font-semibold leading-[20px]">{profile.elo}</p>
                                <p className="text-2xs font-light uppercase leading-[20px]">POINTS</p>
                            </a>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="relative mt-2 flex items-center justify-center gap-5">
                    {socials.length>0 ? 
                    <a className="appearance-none cursor-pointer flex group h-6 items-center justify-center relative rounded-10 text-sm transition w-6" href={`https://${socials[0].instagram}`}>
                        <FaInstagram size={24} />
                    </a> : ''
                    }

                    {socials.length>0 ? 
                    <a className="appearance-none cursor-pointer flex group h-6 items-center justify-center relative rounded-10 text-sm transition w-6" href={`https://${socials[0].telegram}`}>
                        <FaTelegram size={24} />
                    </a> : ''
                    }
                </CardFooter>
                </div>
            </Card>
        </div>
        <div className="px-5 mb-5 max-lg:mt-10">
            <div>
                <h2 className="text-xl font-bold mb-2">Statistics
                </h2>
                {getStatistics(params.login)}
            </div>
            <div>
            <h2 className="text-xl font-bold">Recent Matches</h2>
            {recentGames(matches, params.login)}
            </div>
        </div>
        </div>
    )   
}