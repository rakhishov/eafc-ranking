import { NextRequest, NextResponse } from "next/server"
import { prisma } from "../../../../prisma/client"
import { revalidatePath } from "next/cache"

export async function GET(req: NextRequest) {
    'use server'
    revalidatePath(req.url)
    const players = await prisma.user.findMany()
    if (!players) {
        return NextResponse.json({notFound: true})
    }
    const response = NextResponse.json(players);

  
    return response;
}