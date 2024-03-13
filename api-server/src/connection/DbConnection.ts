import mongoose from "mongoose";

const ConnectDb=async():Promise<void> =>{

    try {
        const DB:string|undefined = process.env.DATABASE

        if (!DB) throw new Error("database connection string is not provided.");

        const connect=await mongoose.connect(DB);
        console.log(
            "database connected: ",
            connect.connection.host,
            connect.connection.name
        )
        
    } catch (error) {
        console.error(error)
        console.log("failed to connect to the database.");
        process.exit(1);
    }
}
export default ConnectDb;



