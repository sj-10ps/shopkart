import React from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const PaginationButtons = ({page,setPage,count,pageSize}) => {
    const totalpage=Math.ceil(count/pageSize)
  return (
    <div className='bg-white rounded-sm p-2 flex gap-2'>
    <button onClick={()=>setPage(prev=>prev-1)} disabled={page===1}><FaChevronLeft/></button>
    <p>{page}</p>
       <button  onClick={()=>setPage(prev=>prev+1)} disabled={page===totalpage}><FaChevronRight/></button>
    </div>
  )
}

export default PaginationButtons
