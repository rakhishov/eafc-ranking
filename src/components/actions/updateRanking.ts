import { prisma } from "../../../prisma/client";


export default async function updateRanking(){
    'use server'
    const orderedItems = await prisma.user.findMany({
        orderBy: {
          elo: 'desc' // 'asc' for ascending order or 'desc' for descending order
        }
      });
      const fun = orderedItems.map((user, index) => prisma.user.update({
        where: {
          login: user.login
        },
        data: {
          rank: index + 1
        }
      }))

      await Promise.all(fun);

}