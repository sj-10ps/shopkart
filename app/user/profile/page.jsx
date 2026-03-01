
"use client"
import LoginCard from '@/components/LoginCard'
import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'
import ProfileCard from '@/components/ProfileCard'
import BackButton from '@/components/BackButton'

const Login = () => {
  const {data:session} = useSession()
  return (
    <div className='flex justify-center items-center min-h-[calc(100vh-80px)]'>
      {session?
      ( 
      <div className='flex flex-col gap-2'>
        <BackButton location={'/user'}/>
             <ProfileCard data={session.user} signOut={signOut}/>
      </div>
     ):(
      <div className='w-full md:max-w-sm mx-5'>
        <LoginCard/>
     </div>
     )
    
    }
    
    </div>
  )
}

export default Login
