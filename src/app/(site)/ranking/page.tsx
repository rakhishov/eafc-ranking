
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


export default async function RankingPage(){
    const users = await getUsers()
    return (
    <div className='m-10'>
        <Table className='lg:w-3/5 lg:m-auto '>
            <TableCaption>Ranking</TableCaption>
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
            {users.map((user, index) =>
                <TableRow>
                        <TableCell key={index} >{index+1}</TableCell>
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
    </div>
)
}