import connectDB from '@/config/config'
import User from '@/models/User'
import GoogleProvider from 'next-auth/providers/google'
import { signIn } from 'next-auth/react'
const authOptions={
    providers:[
        GoogleProvider({
            clientId:process.env.CLIENT_ID,
            clientSecret:process.env.CLIENT_SECRET,
            authorization:{
                params:{
                    prompt:'consent',
                    access_type:'offline',
                    response_type:'code'
                }
            }

        })
    ],
    callbacks:{
        async signIn({ profile }){
           await connectDB()
           const userexists=await User.findOne({email:profile.email})
           if(!userexists){
            await User.create({
                username:profile.name,
                email:profile.email,
                image:profile.image
            })
           }
            return true
        } ,
        async session({session}){
            const user=await User.findOne({email:session.user.email})
            session.user.id=user._id.toString()
            return session
        }
    
    },
    pages:{
        signIn:'/user/profile'
    }
}

export default authOptions