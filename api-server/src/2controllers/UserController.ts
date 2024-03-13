import express,{Express,Response,Request} from "express";
import bcrypt from "bcrypt"

import jwt,{JwtPayload} from "jsonwebtoken";
import User from "../model/UserModel";


interface AuthenticatedRequest extends Request {
  user?: JwtPayload; // Add 'user' property to Request, where user get data from JwtPayload.
}

// @desc register a user
// @routes POST /user/register
// @access public
const getRegister = async (req:Request, res:Response) => {
    try {
      const { username, email, password } = await req.body;

      if (!username || !email || !password) {
        res.status(400).json({ message: "all filed required" });

      } else {
        const userAvailable = await User.findOne({ email });

        if (userAvailable) {
          res
            .status(400)
            .json({ message: `user ${email} is already registered  ` });

        } else {
          // create hashedPassword
          const hashedPassword = await bcrypt.hash(password, 10);

          // create user
          const user = await User.create({
            username,
            email,
            password: hashedPassword,
          });
          console.log(`user created ${user} `);
  
          if (user) {
            res.status(201).json({
              message:"user created",
               _id: user.id, 
               email: user.email 
              });
          } else {
            res.status(400).json({ message: "user data invalid" });
          }
        }
      }

    } catch (error) {
      console.error(error);
    }
  };
  
  // @desc login a user
  // @routes POST /user/login
  // @access public
  const getLogin = (async (req:Request, res:Response) => {
    try {
      const { email, password } = await req.body;

      if (!email || !password) {
        res.status(400).json({ message: "all field required" });

      } else {
        const user = await User.findOne({ email });
  
        // compare with the both hashed password
        if (user && (await bcrypt.compare(password, user.password))) {
  
          // generate Token
          const accessToken = jwt.sign(
            {
              // this is your jwt payload
              user: {
                username: user.username,
                email: user.email,
                id: user.id,
              },
            },
            process.env.ACCESS_TOKEN_SECRET!,
            { expiresIn: "15m" }
          );
  
          res.status(200).json({
            message:"user Logged in",
            token: accessToken 
            });
  
        } else {
          res.status(401).json({ message: "email or password is invalid" });
        }
      }

    } catch (error) {
      console.error(error);
    }
  });
  
  // @desc get current user
  // @routes GET /api/user/current
  // @access private
  const getCurrent = async (req:AuthenticatedRequest, res:Response) => {

    res.json(
     req.user
    ); 
  };

  export {
    getRegister, getLogin, getCurrent 
  }