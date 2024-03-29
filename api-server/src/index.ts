import express,{Express,Request,Response} from "express"
import cors from "cors"
import dotenv from "dotenv";

import ConnectDb from "./connection/DbConnection";
import userRoutes from "./1routes/UserRoutes"; 
import TransRoutes from "./1routes/TransactionRoutes"


dotenv.config({path:"./.env"})
const port =process.env.PORT
const app: Express=express()
app.use(express.json());
app.use(cors())

// DataBase Connection
ConnectDb();


// Routes
app.use("/transaction", TransRoutes)
app.use("/user", userRoutes)

// home
app.get("/", (req:Request,res:Response)=>{
    res.status(200).json({
        message:"Finance Management API is live"
      })
})


app.listen(port,()=>{
  console.log(
    `[server]: hello, my Server is running at http://localhost:${port}`
  );
})
