import { Router } from "express";
import { pool } from "../db.js";
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs";
import { authorize } from "../middlewares/authorize.js";
const route = Router()



route.post('/signup', async (req, res) => {
    const { email, name, password } = req.body
    let salt = await bcrypt.genSalt()
    let password1 = await bcrypt.hash(password, salt)
    await pool.query('insert into customer(name,email,password) values($1,$2,$3)', [name, email, password1])
    return res.json({ message: "Done" })
})

route.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body
        let hashed = await pool.query('select password from customer where email = $1', [email])

        let result = await bcrypt.compare(password, hashed.rows[0].password)
        if (result === true) {
            let id=await pool.query('select id from customer where email = $1',[email])
            let token=jwt.sign({email,id},process.env.SECRET_KEY)
                
        return res.status(200).json({ message: 'Authorized' ,token})
        }
        else {
            return res.status(401).json({ message: 'Unauthorized' })
        }
    }
    catch (e) {
        return res.status(500).json(e)
    }

})


route.delete('/delete/:id',authorize,async(req,res)=>{
    try{
        const customerid=req.params.id
        await pool.query('Delete from customer where id = $1',[customerid])
        return res.status(200).json({message:'Account deleted'})

    }
    catch(e){
        return res.status(500).json({error:e})

    }
})

export default route