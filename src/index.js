import 'dotenv/config'
import connectDB from "./db/index.js";
import { app } from './app.js';

connectDB()
.then(()=>{
    const Port = process.env.PORT || 8000
    app.listen(Port)
    console.log(`Server is running at port: ${Port}`);
})
.catch((error)=>{
    console.error("MONGO db connection failed !!!", error);
})