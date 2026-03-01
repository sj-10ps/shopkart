import { withAuth } from 'next-auth/middleware'
export default withAuth({
    pages:{
        signIn:'/user/profile'
    }
})
export const config={
    matcher:[
        "/user/cart",
        "/seller",
        "/seller/profile"
    ]
}