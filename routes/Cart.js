import { Router } from "express";
import { authorize } from "../middlewares/authorize.js";
import { pool } from "../db.js";
const route = Router()

route.post('/addtocart', authorize, async (req, res) => {
    try {
        const { productid, customerid } = req.body
        await pool.query('Insert into cart(productid,userid) values($1,$2)', [productid, customerid])
        return res.status(200).json({message:'Added to cart successfully'})
    }
    catch (e) {
        return res.status(500).json({ error: e })
    }

})

route.delete('/removefromcart/:productid',authorize,async(req,res)=>{
    try{
        await pool.query('Delete from cart where customerid=$1 and productid=$2',[customerid,productid])
        return res.status(200).json({message:'Item removed successfully from cart'})
           
    }
    catch(e){
        return res.status(500).json({error:e})

    }
})

export default route