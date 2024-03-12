import mongoose from "mongoose";


const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"please add the username"],
    },
    email:{
        type:String,
        required:[true,"please add the email"],
        unique:[true,"email address already taken"],
    },
    password:{
        type:String,
        required:[true,"please add the password"],
    },
},{
    timestamps:true,
});

const mongo=mongoose.model("DataUser",userSchema);

 export default mongo;
