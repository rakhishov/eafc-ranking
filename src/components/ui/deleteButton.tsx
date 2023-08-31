'use client'
import Typewriter from 'typewriter-effect';
import deleteUser from "../actions/deleteUser"
import { useState } from "react"
import { useRouter } from 'next/navigation';
import {FaTrashAlt} from 'react-icons/fa';

interface ButtonProps{
    id: number
}
export default function DeleteButton(props: ButtonProps){
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const handleDelete = async(id: number) =>{
        setLoading(true)
        try{
            await deleteUser(id)
            setLoading(false)
            router.replace('/ranking')
        }
        catch{
            console.log("can't delete user")
        }
    }
    return (
        <>
        {loading ? 
        <Typewriter
        onInit={(typewriter) => {
          typewriter.typeString('Wait...')
            .callFunction(() => {
              console.log('String typed out!');
            })
            .pauseFor(1500)
            .deleteAll()
            .callFunction(() => {
              console.log('All strings were deleted');
            })
            .start();
        }}
      />
        : <button className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            onClick={()=> handleDelete(props.id)}
        >
            <FaTrashAlt />
        </button>}

        </>
    )
}