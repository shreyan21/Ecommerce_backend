import express from 'express'
import cors from 'cors'
import userroute from "./routes/User.js"
import cartroute from './routes/Product.js'


const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cors())

app.use('/user',userroute)
app.use('/cart',cartroute)

app.listen(3000)