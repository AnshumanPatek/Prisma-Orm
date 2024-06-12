import prisma from "../DB/db.config.js";

export const fetchPosts = async(req,res)=>{
 
    const page = Number(req.query.page)||1;
    const limit = Number(req.query.limit)||10;
    if(page<=0){
        page = 1
    }
    if(limit<=0 || limit>100){
        limit=10
    }

    const skip = (page -1)*limit
   
    const posts = await prisma.post.findMany({

        skip:skip,
        take:limit,
       
        // user ka data with post


        include:{
            comment:{
                include:{
                    user:{
                        select:{
                            name:true,
                        }
                    }
                }
            }
        },
        orderBy:{
            id:"desc",
        },
        // where:{
        //     comment_count:{
        //         // gt:1,
        //         //fliter accountly
        //         gt:0,
        //     }
        // }
        // where:{
        //     title:{
        //         startsWith:"next",
        //         // endsWith:"next"

        //         // equals:"Prisma Blog"
        //     }
        // }

    //     where:{
    //     OR:[{
    //         title:{
    //             startsWith:"next",
    //         },
    //     },{
    //         title:{
    //             endsWith:"Blog",
    //         },
    //     },


    //     ]
    //     // same case for AND
    // }



    where:{
       NOT:{
        title:{
            endsWith:"Blog",
        }
       } 
    }
    });
    // find many k liye array mai data aata hai

    //* to get the total posts count
    const totalPosts = await prisma.post.count()
    const totalPages = Math.ceil(totalPosts/limit)
    return res.json({status:200,data:posts, meta:{
        totalPages,
        currentPage:page,
        limit:limit,
    }})
};



// * show user single
export const showPost=async(req,res)=>{
    const postId = req.params.id;
    const post = await prisma.post.findFirst({
        // as a object return kia hai
        where:{
            id:Number(postId),
        }
    })

    return res.json({status :200,data : post})
}

export const createPost = async(req,res)=>{
    const {user_id, title, description} = req.body

        const newPost = await prisma.post.create({
        data:{
            user_id: Number(user_id),
            title,
            description,
        }
    });
    return res.json({status:200,data: newPost,msg:"Post created."})
}


export const updatePost = async(req,res)=>{
    const postId = req.params.id
    const {title,description}=req.body;

    const post= await prisma.user.update({
        where:{
            id:Number(postId)
        },
        data:{
            
           
            description
        }
    })



   return res.json({status:200,data:post,msg:"User updated successfully"}) 
}

// * Delete user
export const deletePost =async(req,res)=>{
const postId = req.params.id;
await prisma.post.delete({
    where:{
        id:Number(postId),
    }
})
return res.json({status:200,msg:"Post delete successfully"})
}




// * To Search the post

export const searchPost = async(req,res)=>{
    const query = req.query.q
    const posts = await prisma.post.findMany({
        where:{
            description:{
                search:query,
                // contains:query
                // for smaller things // this is not performance oriented 
            }
        }
    })
    return res.json({status:200, data:posts});
}