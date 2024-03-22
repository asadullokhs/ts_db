import mongoose, {ConnectOptions} from "mongoose";

export const connectDb = async (url: string):Promise<void> => {
    try {
        await mongoose.connect(url)
        // await mongoose.connect(url, {
        //     useNewUrlParser: true,
        //     useUnifyTopology: true,
        // } as ConnectOptions);
        
    } catch (error) {
        console.error(error);
    }
}
