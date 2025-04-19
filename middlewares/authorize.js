import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
export const authorize = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        let decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.customerid = decoded.id
        next()
    }
    catch (e) {
        return res.status(401).json(e)
    }

}