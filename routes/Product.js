import { Router } from "express";
import dotenv from 'dotenv'
import { authorize } from "../middlewares/authorize.js";
import { adminauthorize } from "../middlewares/adminauthorize.js";
import { pool } from "../db.js";
const route = Router()
dotenv.config()


route.post('/addproduct', [adminauthorize, authorize], async (req, res) => {
    try {

        const { name, category, description } = req.body
        await pool.query('Insert into product(name,category,description) values($1,$2,$3)', [name, category, description])
        return res.status(200).json({ message: 'Product added successfully' })

    }
    catch (e) {
        return res.status(500).json({ message: 'Server error' })

    }
})

route.get('/seeproducts', async (req, res) => {
    try {

        const result=await pool.query('Select * from product')
        const data=result.rows 
        return res.status(200).json({data})
           
    }
    catch (e) {
        return res.status(500).json({error:e})

    }
})

export default route