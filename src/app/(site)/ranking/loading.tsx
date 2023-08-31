import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Avatar } from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading(){
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
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>

                {[...Array(10)].map((i: number) =>
                <TableRow key={i}>
                        <TableCell>{}</TableCell>
                        <TableCell>
                            <Avatar>
                                <Skeleton className="w-[50px]"/>
                            </Avatar>
                        </TableCell>
                        <TableCell>
                            <Skeleton className="sm:w-full md:w-2/3 lg:w-3/5 h-[20px] rounded-full"/>
                        </TableCell>
                        <TableCell>
                            <Skeleton className="sm:w-full md:w-2/3 lg:w-3/5 h-[20px] rounded-full"/>
                        </TableCell>
                        <TableCell>
                            <Skeleton className="md:float-right sm:w-full md:w-2/5 h-[20px] rounded-full"/>
                        </TableCell>
                </TableRow>)
                }
                
                </TableBody>         
            </Table>
        </div>)
}