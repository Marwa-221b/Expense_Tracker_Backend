import {User} from '../models/User'
import {Request,Response} from "express"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


const maxAge = 60 * 60 * 24;

const createToken=(id:string):string=>{
    return jwt.sign({id},process.env.JWT_SECRET as string,{
        expiresIn:maxAge
    })
}
const signUp=async (req:Request,res:Response)=>{
    try{
       const {name,email,password}=req.body

    const existed=await User.findOne({email})
    if(existed) return res.status(400).json({message:"Already have an account"})
   
   
   const hashedPassword=await bcrypt.hash(password,10)
    const user =new User({name,email,password:hashedPassword})
    await user.save()

    res.status(201).json({message:"Created Successfully"})



    }catch(err){
            console.log(err);

        res.status(500).json({error:err})

    }
    

}

const signIn=async (req:Request,res:Response)=>{
    try{
         const {email,password}=req.body

         const user=await User.findOne({email})
         if(!user){
        return res.status(404).json({msg:"email not found"})
         }

        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(404).json({msg:"Password is wrong"})

        }
        const token =createToken((user.id))
        res.cookie("token",token,{
            httpOnly:true,
            maxAge:maxAge*1000,
        })
        res.status(200).json({
            msg:"signed in successfully",
            data:user,
        })
  

    }catch(err){
        res.status(500).json({
            error:err
        })
    }
   


}






export {signUp,signIn}