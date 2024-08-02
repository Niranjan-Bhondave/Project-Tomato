import express from  'express';
import cors from 'cors'
import {connectDB} from './config/db.js'
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config'
import cartRouter from './routes/cartRoute.js';
//app config
const app = express();
const PORT = 4000;

//app middleware
app.use(express.json())
app.use(cors());

//db connection
connectDB();

//api endpoint
app.use("/api/food", foodRouter)
app.use("/images", express.static("uploads"))
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter)

app.get('/', (req, res) => {
    res.send("API Working")
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

//mongodb+srv://niranjan:Niru2003@cluster0.fk1cgg8.mongodb.net/?
