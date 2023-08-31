import { getServerSession } from "next-auth"
import authOptions from "@/utils/authOptions"
import { redirect } from "next/navigation"  
import updateRanking from "@/components/actions/updateRanking"
import UpdateButton from "@/components/ui/updateButton"
export default async function Dashboard(){
    const session = await getServerSession(authOptions)
    if(!session){
        redirect('/login')
    }
    return(<>
        <div className="flex justify-center gap-5 mt-5">
            <a href="/admin/add">
                <button type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                Add new player
                </button>
            </a>
        <a href="/admin/result">
            <button type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                Add new result
            </button>
        </a>
        <UpdateButton />
        
    </div>
    </>)
}