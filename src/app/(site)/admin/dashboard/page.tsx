import Link from "next/link"
export default async function(){
    return(<>
    <div className="flex justify-center gap-5 mt-5">
        <Link href='/admin/add'>Add</Link>
        <Link href='/admin/result'>Result</Link>
    </div>
    </>)
}