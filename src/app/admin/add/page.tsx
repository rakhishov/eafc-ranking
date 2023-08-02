import { Input } from "@/components/ui/input"
import { prisma } from "../../../../prisma/client"
import updateRanking from "@/components/functions/updateRanking"
import { CldUploadButton } from 'next-cloudinary';
import addUser from "@/components/functions/addUser";

export default function Page(){
    return(
        <form className="flex flex-col items-center" action={addUser}>
            <div className='flex flex-col justify-center align-middle gap-4'>
                    <Input className="w-[200px]" type="text"  name="name" placeholder="name" />
                    <Input className="w-[200px]" type="text" name="login" placeholder="login" required />
                    <Input className="w-[200px]" type="text" name="elo" defaultValue={1000} />
            </div>
            <button type="submit">Submit </button>
                
        </form>
    )
}