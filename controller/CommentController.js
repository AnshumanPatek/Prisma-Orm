import prisma from "../DB/db.config.js";

export const fetchComments = async(req,res)=>{
    const comments = await prisma.comment.findMany({
        // user ka data with post


        include:{
            user:true,
            post:{
                include:{
                    user:true,
                }
            }
        }

    })
    // find many k liye array mai data aata hai
    return res.json({status:200,data:comments})
}
// * show user single
export const showComment=async(req,res)=>{
    const commentId = req.params.id;
    const post = await prisma.comment.findFirst({
        // as a object return kia hai
        where:{
            id:Number(commentId),
        }
    })

    return res.json({status :200,data : post})
}

export const createComment = async(req,res)=>{
    const {user_id, post_id, comment} = req.body
//    *Increase the comment counter
    await prisma.post.update({

        where:{
            id:Number(post_id)
        },
        data:{
            comment_count:{
                increment:1
            }
        }
    })
        const newcomment = await prisma.comment.create({
        data:{
            user_id: Number(user_id),
            post_id: Number(post_id),
           comment,
        }
    });
    return res.json({status:200,data: newcomment,msg:"comment created."})
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



   return res.json({status:200,data:post,msg:"Comment updated successfully"}) 
}

// * Delete user
export const deleteComment =async(req,res)=>{
const CommentId = req.params.id;


await prisma.post.update({

    where:{
        id:Number(post_id)
    },
    data:{
        comment_count:{
            decrement:1
        }
    }
})
await prisma.comment.delete({
    where:{
        id:Number(CommentId),
    }
})
return res.json({status:200,msg:"Post delete successfully"})
}