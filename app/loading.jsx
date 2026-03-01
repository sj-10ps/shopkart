import React from 'react'
import { FaSpinner } from 'react-icons/fa'

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <FaSpinner size={50} className="animate-spin text-white" />
    </div>
  )
}

export default Loading