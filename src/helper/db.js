import mongoose from "mongoose";

const config = {
    isConnected : 0
}
export default async function ConnectDB() {
    try{
        const {connection} = await mongoose.connect(process.env.MONGO_DB_URL,{
            dbName:"fanshop"
        })
        config.isConnected = connection.readyState;
        console.log("DB Connected ",config.isConnected);
    }catch(error){
        console.log("DB is not Connected");
    }
}