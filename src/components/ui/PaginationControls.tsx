'use client'

import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
interface PaginationControlsProps {
    hasNextPage: boolean,
    hasPreviousPage: boolean,
    length: number,
}

function getPages(pagesLength: number, page: string, per_page: string, router: any){
    const liElements = [];
    for(let i = 0; i < pagesLength; i++){
        liElements.push(<li className={`${Number(page)-1==i ? 'bg-primary-100 font-medium text-primary-700' : 'bg-transparent text-neutral-600 hover:bg-neutral-100  dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white'} relative block rounded-full  px-3 py-1.5 text-sm  transition-all duration-300`}>
            <button
            onClick={
                ()=>{
                    router.push(`/ranking?page=${i+1}&per_page=${per_page}`)
                }
            }>
            {i+1}
            </button>
        </li>)
    }
    return liElements
}

const PaginationControls = ({
    hasNextPage, hasPreviousPage, length
}: PaginationControlsProps) =>{
    const router = useRouter()
    const searchParams = useSearchParams()
    const page = searchParams.get('page') ?? '1'
    const per_page = searchParams.get('per_page') ?? '10'

    return(
    <div>
    <nav aria-label="Page navigation example">
    <ul className="list-style-none flex">
        <li>
            <button
            className="relative block rounded-full px-3 py-1.5 text-sm disabled:text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white enabled:bg-primary-100 enabled:text-neutral-500 disabled:pointer-events-none "
            disabled={!hasPreviousPage}
            onClick={()=>
                router.push(`/ranking?page=${Number(page)-1}&per_page=${per_page}`)}
            >Previous</button>
        </li>


        {getPages(Math.ceil(length/Number(per_page)), page, per_page, router)}
        <li>
        <button
            className="relative block rounded-full bg-transparent px-3 py-1.5 text-sm enabled:text-neutral-600 disabled: text-neutral-500 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white disabled:pointer-events-none "
            onClick={()=>
            router.push(`/ranking?page=${Number(page)+1}&per_page=${per_page}`)}
            disabled={!hasNextPage}
            >Next</button>
        </li>
  </ul>
</nav>
</div>
    )
}

export default PaginationControls