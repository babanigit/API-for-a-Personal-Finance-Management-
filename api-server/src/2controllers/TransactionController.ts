import { Express,Request, Response } from "express";

import trans from "../model/TransactionModel";
import { Document } from "mongoose";

interface CustomRequest extends Request {
  user: { 
    username: string,
    email:string,
    id: string,
  }; // Define the user property
}

interface Transaction extends Document {
  _id: string;
  user_id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  expenses: number;
  income: number;
  savings:number;
}



const getSummary = (async (req:Request, res:Response):Promise<void> => {

  try {

    const customReq = req as CustomRequest; // Type assertion 

    // it will find all the transaction with your user_id
    const data:Transaction[] = await trans.find({ user_id: customReq.user.id });
   
    // total income
    let totalIncome:number=0;
    data.forEach((data) => {
      totalIncome = totalIncome + data.income;
      });

      // total expenses
      let totalExpenses:number=0;
      data.forEach((data) => {
        totalExpenses = totalExpenses + data.expenses;
        });

          // total savings
      let totalSavings:number=totalIncome-totalExpenses;
    

      res.status(200).json({
        "total income" :totalIncome,
        "total expenses" :totalExpenses,
        "total Savings" :totalSavings,

        "all Transactions":data,
      });

      console.log("get transaction" )

  } catch (error) {
    console.error(error)
  }

  
  });


// @desc get all trans
// @routes GET/api/trans
// @access private
const getTrans = (async (req:Request, res:Response):Promise<void> => {

  try {

    const customReq = req as CustomRequest; // Type assertion

    // it will find you all the user id's
    const data = await trans.find({ user_id: customReq.user.id });
    res.status(200).json(data);

    
 

  } catch (error) {
    console.error(error)
  }

  
  });
  
  // @desc Create new transaction
  // @routes POST/api/trans
  // @access private
  const createTrans = (async (req:Request, res:Response):Promise<void> => {
    try {

      const customReq = req as CustomRequest; // Type assertion

      const { TransactionName, income,expenses } = await req.body;

      if (!TransactionName || !income || !expenses) {

        res.status(400).json({ message: "all filed required" });
        // res.status(400);
        // throw new Error({ message: "all field are mandatory" });
      } else {

        console.log(customReq.user)
        const data = await trans.create({
          TransactionName,
          income,
          expenses,
          user_id: customReq.user.id,
        });
        res.status(201).json(data);
      }


    } catch (error) {
      console.error(error);
    }
  });
  
  // @desc get transaction by id
  // @routes GET/api/trans/:id
  // @access private
  const getTransId = (async (req:Request, res:Response):Promise<void> => {

    try {
      const customReq = req as CustomRequest; // Type assertion

      const data = await trans.findById(customReq.params.id);
    if (!data) {
      res.status(404).json({ message: " Transaction not found" });
    } else {
      res.status(200).json(data);
    }
      
    } catch (error) {
      console.error(error);
    }
    


  });
  
  // @desc update trans
  // @routes PUT/api/trans/:id
  // @access private
  const updateTrans = (async (req:Request, res:Response):Promise<void> => {

    try {
      const customReq = req as CustomRequest; // Type assertion


      const data = await trans.findById(req.params.id);

    if (!data) {
      res.status(404).json({ message: " transaction not found" });
    } else {
      if (data.user_id.toString() != customReq.user.id) {
        res
          .status(403)
          .json({
            message: "user don't have permission update other user contacts",
          });
      } else {
        const updatedData = await trans.findByIdAndUpdate(
          customReq.params.id,
          customReq.body,
          { new: true }
        );
        res.status(200).json(updatedData);
      }
    }


    } catch (error) {
      console.error(error)
    }

    
  });
  
  // @desc delete trans
  // @routes DELETE/api/trans/:id
  // @access private
  const deleteTrans = (async (req:Request, res:Response):Promise<void> => {
    try {
      const customReq = req as CustomRequest; // Type assertion

      const data = await trans.findById(req.params.id);
      if (!data) {
        res.status(404).json({ message: " Transaction not found" });
      } else {
        if (data.user_id.toString() != customReq.user.id) {
          res
            .status(403)
            .json({
              message: "user don't have permission update other user contacts",
            });
        } else {
          await trans.deleteOne({ _id: customReq.params.id });
          res.status(200).json(data);
        }
      }


    } catch (error) {
      console.error(error);
    }
  });

  export {
    getTrans,
    getTransId,
    deleteTrans,
    updateTrans,
    createTrans,
    getSummary
  }
  