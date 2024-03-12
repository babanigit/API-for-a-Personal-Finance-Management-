import express,{Express,Request,Response} from "express"
import cors from "cors"
import dotenv from "dotenv";
import ConnectDb from "./connection/DbConnection";

import userRoutes from "./1routes/UserRoutes"; 


dotenv.config({path:"./.env"})
const port =process.env.PORT
const app: Express=express()
app.use(express.json());
app.use(cors())
ConnectDb();


// Routes
// app.use("/api/transaction", require("./1routes/TransactionRoutes"))
app.use("/api/user", userRoutes)



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
