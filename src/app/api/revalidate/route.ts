import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
 
export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('path') as string
  revalidatePath(path)
  return NextResponse.json({ revalidated: true, now: Date.now() })
}