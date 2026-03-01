import connectDB from "@/config/config"
import Product from "@/models/Product"

export const GET=async(request)=>{
    const {searchParams}=new URL(request.url)
    const search=searchParams.get('search')
    const category=searchParams.get('category')
    const rate=searchParams.get('rate')
    const price=searchParams.get('price')
    const page=searchParams.get('page')
    const pageSize=searchParams.get('pagesize')
    console.log(rate)
    const searchPattern=new RegExp(search,"i")
    const categoryPattern=new RegExp(category,'i')
     const exprConditions = []
 
    const skipCount=(page-1)*pageSize
    try {
        await connectDB()
        let query={}
        if(search&&search!==""){
            query.$or=[
                {title:searchPattern},
                {description:searchPattern} 
            ]
        }
        if(category&&category!=="All"){
            query.category=categoryPattern
        }
         if (rate && rate !== "All") {
      exprConditions.push({
        $gte: [{ $toDouble: "$rating" }, Number(rate)]
      })
    }

   

        if(price&&price!=="0"){
            exprConditions.push({
        $lte: [{ $toDouble: "$price" }, Number(price)]
      })
        }

           if (exprConditions.length) {
      query.$expr = { $and: exprConditions }
    }
       
        const data=await Product.find(query).skip(skipCount).limit(pageSize)
        const documentcount=await Product.countDocuments({})
        return new Response(JSON.stringify({count:documentcount,data:data}),{status:200})
    } catch (error) {
        return new Response(JSON.stringify(error),{status:500})
    }
}