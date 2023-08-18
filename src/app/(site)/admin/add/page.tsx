'use client'
import { Input } from "@/components/ui/input"
import { CldUploadButton } from 'next-cloudinary';
import addUser from "@/components/actions/addUser";
import "@uploadthing/react/styles.css";
import { UploadButton } from "@/utils/uploadthing";
import { useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function Page(){
    const {data: session} = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/login')
        },
    })
    const router = useRouter();
    const [photo, setPhoto] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [login, setLogin] = useState<string>('');
    const [elo, setElo] = useState<string>('1000');
    const [loading, setLoading] = useState<Boolean>(false)
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }
    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(e.target.value);
    }
    const handleEloChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setElo(e.target.value);
    }

    const handleSubmit = async(e: any) =>{
        e.preventDefault();
        setLoading(true);
        try{
        const formData = new FormData();
        formData.append('name', name);
        formData.append('login', login);
        formData.append('elo', elo);
        formData.append('link', photo);
        addUser(formData)
        router.replace('/ranking')
        } catch (error){
            console.error('API call failed:', error);
            setLoading(false);
        }
    }

    function disableUploadButton(){
        var element = document.getElementById("uploadButton");
        element?.classList.add("hidden");
    }

    return(
    <> {session?.user!=null && 
        <form className="flex flex-col mt-5 items-center" onSubmit={handleSubmit}>
            {loading ? <span className="loader flex text-neutral-800 mt-10"></span> : 
            <>
            <h2 className="pb-2 text-[30px] font-bold leading-[36px]">Create New Player</h2>
            <div className='flex flex-col justify-center align-middle text-black gap-4 mt-4 mb-4'>
                    <Input className="w-[200px]" type="text"  name="name" onChange={handleNameChange} placeholder="Name" />
                    <Input className="w-[200px]" type="text" name="login" onChange={handleLoginChange} placeholder="Login" required />
                    <Input className="w-[200px]" type="number" name="elo" onChange={handleEloChange} placeholder="Elo" defaultValue={1000} />
            </div>
            <div className="" id="uploadButton">
                <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                    // Do something with the response
                    if(res){
                        setPhoto(res[0].fileUrl);
                        disableUploadButton();
                    }
                    
                    
                    }
                    }
                    onUploadError={(error: Error) => {
                    // Do something with the error.
                    alert(`ERROR! ${error.message}`);
                    }}
                    />
            </div>
            <button className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 pt-2" type="submit">Submit </button>
            </>}
        </form>
}
        </>
    )
}