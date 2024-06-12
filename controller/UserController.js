import prisma from "../DB/db.config.js";


export const fetchUsers = async(req,res)=>{

    const users = await prisma.user.findMany({
        // include:{
            
        //     post:true,
        // },

        // include:{
        //     post:{
        //         select:{
        //             title:true,
        //             comment_count:true,
        //         }
        //     }
        // }

        select:{
            _count:{
                select:{
                    post:true,
                    comment:true,
                }
            }
        }

        // include:{
        //     post:{
        //         select:{
        //             title:true,
        //         }
        //     }
        // }

    })
    // find many k liye array mai data aata hai

    return res.json({status:200,data:users})
}

// * show user single
export const showUser=async(req,res)=>{
    const userId = req.params.id;
    const user = await prisma.user.findFirst({
        // as a object return kia hai
        where:{
            id:Number(userId),
        }
    })

    return res.json({status :200,data : user})
}

export const createUser = async(req,res)=>{
    const {name,email,password} = req.body

    const findUser = await prisma.user.findUnique({
        where:{
            email:email
        }
    })

    if(findUser){
        return res.json({status:400 , message:"Email Already Taken. please enter another email."})
    }
    const newUser = await prisma.user.create({
        data:{
            name:name,
            email:email,
            password:password
        }
    })


    return res.json({status:200,data: newUser,msg:"User created."})
}


export const updateUser = async(req,res)=>{
    const userId = req.params.id
    const {name,email,password}=req.body;

    const newUser= await prisma.user.update({
        where:{
            id:Number(userId)
        },
        data:{
            name,
            email,
            password
        }
    })



   return res.json({status:200,data:newUser,msg:"User updated successfully"}) 
}

// * Delete user

export const deleteUser =async(req,res)=>{
const userId = req.params.id;
await prisma.user.delete({
    where:{
        id:Number(userId)
    }
})
return res.json({status:200,msg:"User delete successfully"})
}

