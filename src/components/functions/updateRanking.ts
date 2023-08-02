import { prisma } from "../../../prisma/client";


export default async function updateRanking(){
    'use server'
    const orderedItems = await prisma.user.findMany({
        orderBy: {
          elo: 'desc' // 'asc' for ascending order or 'desc' for descending order
        }
      });
      for (let i = 0; i < orderedItems.length; i++) {
        const user = orderedItems[i];
        const newValue = await prisma.user.update({
          where: {
            login: user.login
          },
          data: {
            rank: i + 1
          }
        });
      } 
}