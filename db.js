import pkg from "pg";
import dotenv from 'dotenv'
const { Pool } = pkg;
dotenv.config()
const pool = new Pool({
    user: `${process.env.USER}`,
    host: `${process.env.HOST}`,
    port: process.env.PORT,
    database: `${process.env.DATABASE}`,
    password: `${process.env.PASSWORD}`,
})

export { pool }