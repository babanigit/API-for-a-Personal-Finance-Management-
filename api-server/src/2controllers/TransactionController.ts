import { Express,Request, Response } from "express";

// @desc get all trans
// @routes GET/api/trans
// @access private
const getTrans = (async (req:Request, res:Response):Promise<void> => {
    // const contacts = await Contact.find({ user_id: req.user.id });
  
    // res.status(200).json(contacts);
  });
  
  // @desc Create new  contacts
  // @routes POST/api/contacts
  // @access private
  const createTrans = (async (req:Request, res:Response):Promise<void> => {
    try {
    //   const { name, email, phone } = await req.body;
    //   if (!name || !email || !phone) {
    //     res.status(400).json({ message: "all filed required" });
    //     // res.status(400);
    //     // throw new Error({ message: "all field are mandatory" });
    //   } else {
    //     const contact = await Contact.create({
    //       name,
    //       email,
    //       phone,
    //       user_id: req.user.id,
    //     });
    //     res.status(201).json(contact);
    //   }
    } catch (error) {
      console.error(error);
    }
  });
  
  // @desc get all contacts
  // @routes GET/api/contacts/:id
  // @access private
  const getTransId = (async (req:Request, res:Response):Promise<void> => {
    // const contact = await Contact.findById(req.params.id);
    // if (!contact) {
    //   res.status(404).json({ message: " contact not found" });
    // } else {
    //   res.status(200).json(contact);
    // }
  });
  
  // @desc update contacts
  // @routes PUT/api/contacts/:id
  // @access private
  const updateTrans = (async (req:Request, res:Response):Promise<void> => {
    // const contact = await Contact.findById(req.params.id);
    // if (!contact) {
    //   res.status(404).json({ message: " contact not found" });
    // } else {
    //   if (contact.user_id.toSting() != req.user.id) {
    //     res
    //       .status(403)
    //       .json({
    //         message: "user dont have permission update other user contacts",
    //       });
    //   } else {
    //     const updateContact = await Contact.findByIdAndUpdate(
    //       req.params.id,
    //       req.body,
    //       { new: true }
    //     );
    //     res.status(200).json(updateContact);
    //   }
    // }
  });
  
  // @desc delete contacts
  // @routes DELETE/api/contacts/:id
  // @access private
  const deleteTrans = (async (req:Request, res:Response):Promise<void> => {
    try {
    //   const contact = await Contact.findById(req.params.id);
    //   if (!contact) {
    //     res.status(404).json({ message: " contact not found" });
    //   } else {
    //     if (contact.user_id.toSting() != req.user.id) {
    //       res
    //         .status(403)
    //         .json({
    //           message: "user dont have permission update other user contacts",
    //         });
    //     } else {
    //       await Contact.deleteOne({ _id: req.params.id });
    //       res.status(200).json(contact);
    //     }
    //   }
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
  }
  