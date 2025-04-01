import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL);
        console.log(`connected to DB${connect.connection.host}`);
    } catch(err) {
        console.log(`error in Mongodb${err}`);
    }
}

export default connectDB;