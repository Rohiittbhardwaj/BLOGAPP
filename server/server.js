import express from "express"
import "dotenv/config"
import cors from "cors"
import connectDB from "./configs/db.js"
import admintRouter from "./Routes/admintRouters.js"
import BlogRouter from "./Routes/blogRoutes.js"

const app = express()


//Middlewares
app.use(cors())
app.use(express.json())


await connectDB()




const PORT = process.env.PORT || 3000

app.get("/",(req,res)=>{
       res.send("Api is working")
})
app.use("/api/admin",admintRouter)
app.use("/api/blog",BlogRouter)


app.listen(PORT,()=>{
    console.log("server run on",PORT)
})

export default app;