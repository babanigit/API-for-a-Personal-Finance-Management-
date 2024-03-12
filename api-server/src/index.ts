import express,{Express,Request,Response} from "express"
import cors from "cors"



const app: Express=express()
app.use(cors())



app.get("/", (req:Request,res:Response)=>{
    res.status(200).json({
        message:"Express.js + Typescript server is live "
      })
})

