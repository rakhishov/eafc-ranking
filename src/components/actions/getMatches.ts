import { prisma } from "../../../prisma/client";
import getPlayerId from "./getPlayerId";

async function getMatches(id: string){
    'use server'

    const player = await prisma.user.findUnique({
      where:{
        id: parseInt(id)
      },
      select:{
        login: true
      }
    })
    const matches = await prisma.match.findMany({
        where: {
          OR: [
            { player1login: player?.login },
            { player2login: player?.login },
          ],
        },
      });
    const len = matches.length
    if(len>5){
        return matches.slice(len-5,len).reverse()
    }
    return matches.reverse()
}

export default getMatches