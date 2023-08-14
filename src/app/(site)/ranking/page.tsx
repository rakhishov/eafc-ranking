
import {prisma} from '../../../../prisma/client'
import Link from 'next/link'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useEffect, useState } from 'react'
import getUsers from '@/components/actions/getUsers'
import PaginationControls from '@/components/ui/PaginationControls'
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
export default async function RankingPage({
    searchParams,
}: {
    searchParams: {[key: string]: string | string | undefined}
}){
    const users = await getUsers()
    const page = searchParams['page'] ?? 1
    const per_page = searchParams['per_page'] ?? 10
    const start = (Number(page) - 1) * Number(per_page)
    const end = start + Number(per_page)
    const players = users.slice(start, end)
    return (
    <div className='m-10'>
        <Table className='pt-6 pb-2 grid-cols-2 gap-10 mx-auto max-w-[1210px] px-2 sm:px-6 lg:px-8'>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[50px]">#</TableHead>
                    <TableHead className="w-[50px]"> </TableHead>
                    <TableHead>name</TableHead>
                    <TableHead>login</TableHead>
                    <TableHead className='text-right'>PTS</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
            {players.map((user: User, index: number) =>
                <TableRow key={user.id}>
                        <TableCell key={index} >{(Number(page)-1)*Number(per_page) + (index+1)}</TableCell>
                        <TableCell>
                        <Avatar>
                            {user.avatarLink != null ? <AvatarImage src={user.avatarLink} /> : <AvatarFallback> <p className=''>{user.name.charAt(0).toLocaleUpperCase()}</p></AvatarFallback>}
                            <AvatarFallback className='text-neutral-600'>{user.name.charAt(0).toLocaleUpperCase()}</AvatarFallback>
                        </Avatar>
                        </TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell><Link href={`/profile/${user.login}`}>{user.login}</Link></TableCell>
                        <TableCell className='text-right'>{user.elo}</TableCell>
                </TableRow>)
                }
                
            </TableBody>            
        </Table>
        <div className='lg:w-3/5 lg:m-auto flex justify-end pt-1'>
        <PaginationControls
            hasNextPage={end<users.length}
            hasPreviousPage={start>0}
            length={users.length}
        />
        </div>
    </div>
)
}