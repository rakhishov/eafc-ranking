import { NextRequest, NextResponse } from "next/server"
import { prisma } from "../../../../prisma/client"


export async function GET(req: NextRequest) {
    const players = await prisma.user.findMany()
    if (!players) {
        return NextResponse.json({notFound: true})
    }
    return NextResponse.json(players)
}