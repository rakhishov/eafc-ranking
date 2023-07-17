import { NextRequest, NextResponse } from "next/server"
import { prisma } from "../../../../prisma/client"


export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const login = searchParams.get('login') as string
    const profile = await prisma.user.findUnique({
        where: {login: login}})
    if (!profile) {
        return NextResponse.json({notFound: true})
    }
    return NextResponse.json(profile)
}