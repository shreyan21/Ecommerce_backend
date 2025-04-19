import dotenv from 'dotenv'
dotenv.config()
export const adminauthorize=async(req,res,next)=>{
     let admin_email=process.env.ADMIN_EMAIL
     const {email}=req.body
     if(admin_email!==email){
         return res.status(401).json({message:'Admin user required'})
     }
     next()
}