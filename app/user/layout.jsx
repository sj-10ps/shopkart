import PublicNavBar from '@/components/PublicNavBar'
import React from 'react'

const PublicLayout = ({children}) => {
  return (
    <div className='bg-linear-to-r flex flex-col from-cyan-200 to-blue-100 min-h-screen'>
        <PublicNavBar/>
      <div>
      {children}
      </div>
    
    </div>
  )
}

export default PublicLayout
