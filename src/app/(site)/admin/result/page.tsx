'use client'
import { Input } from "@/components/ui/input"
import Select from 'react-select';
import countResult from "@/components/actions/countResult";
import { useEffect, useState } from "react"
import { redirect, useRouter } from "next/navigation"
import { signOut, useSession } from "next-auth/react";



interface Player {
    value: string;
    label: string;
}

export default function Result(){
    const {data: session} = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/login')
        },
    })
    const router = useRouter();


    const [players, setPlayers] = useState<Player[]>([])
    const [selectedOption1, setSelectedOption1] = useState<Player>();
    const [selectedOption2, setSelectedOption2] = useState<Player>();
    const [score1, setScore1] = useState<number>(0)
    const [score2, setScore2] = useState<number>(0)

    const handleSubmit = async(e: any) =>{
        e.preventDefault();

        const formData = new FormData();
        const login1 = selectedOption1?.value as string
        const login2 = selectedOption2?.value as string
        formData.append('login1', login1);
        formData.append('score1', score1);
        formData.append('score2', score2);
        formData.append('login2', login2);
        countResult(formData)
        router.replace('/ranking')
    }
    const handleScore1Change = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setScore1(parseInt(e.target.value))
    }
    const handleScore2Change = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setScore2(parseInt(e.target.value))
    }
    const handleOption1 = (e: any) =>{
        setSelectedOption1(e)
    }

    const handleOption2 = (e: any) =>{
        setSelectedOption2(e)
    }
    useEffect(() => {
        fetch('http://localhost:3000/api/users')
        .then((res)=> res.json())
        .then((data)=> {
            const options = data.map((player: any) => ({
                value: player.login,
                label: player.login
            }))
            setPlayers(options)
        })
        .catch((error) => console.error('Error fetching users:', error));   
    }, [])
    
    return(<>
        <div className="p-5 flex flex-col items-center text-neutral-800">
            <form onSubmit={handleSubmit}>
                <div className='flex flex-row gap-4'>
                    <Select 
                    className="w-[200px]"
                    value={selectedOption1}
                    onChange={handleOption1}
                    options={players}
                    />

                    <Input className="w-[45px]" type="number" defaultValue={0} name="score1" onChange={handleScore1Change}></Input>
                    <Input className="w-[45px]" type="number" defaultValue={0} name="score2" onChange={handleScore2Change}></Input>

                    <Select 
                    className="w-[200px]"
                    defaultValue={selectedOption2}
                    onChange={handleOption2}
                    options={players}
                    />
                    <button className="text-white" type="submit">Submit </button>
                </div>



            </form>            
        </div>
        </>
    )
}

 