import { prisma } from "../../../prisma/client";

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

export default getMatches