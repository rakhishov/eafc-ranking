import { NextRequest, NextResponse } from "next/server"
import { prisma } from "../../../../prisma/client"
import { revalidatePath } from "next/cache"


export async function GET(req: NextRequest) {
    'use server'
    const players = await prisma.user.findMany()
    if (!players) {
        return NextResponse.json({notFound: true})
    }
    return NextResponse.json(players)
}