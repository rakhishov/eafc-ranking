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
    const [elo, setElo] = useState<Number>(1000);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }
    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(e.target.value);
    }
    const handleEloChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setElo(parseInt(e.target.value));
    }

    const handleSubmit = async(e: any) =>{
        e.preventDefault();

        const formData = new FormData();
        console.log(formData.append('name', name));
        formData.append('login', login);
        formData.append('elo', elo);
        formData.append('link', photo);
        addUser(formData)
        router.replace('/ranking')
    }

    return(
    <> {session?.user!=null && 
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
            
            <div className='flex flex-col justify-center align-middle text-black gap-4 mt-4 mb-4'>
                    <Input className="w-[200px]" type="text"  name="name" onChange={handleNameChange} placeholder="name" />
                    <Input className="w-[200px]" type="text" name="login" onChange={handleLoginChange} placeholder="login" required />
                    <Input className="w-[200px]" type="number" name="elo" onChange={handleEloChange} defaultValue={1000} />
            </div>
            <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                // Do something with the response
                if(res){
                    setPhoto(res[0].fileUrl);
                }
                }}
                onUploadError={(error: Error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
                }}
                />
            <button className="" type="submit">Submit </button>
        </form>
}
        </>
    )
}