import mongoose from 'mongoose';

export const connectDB = async () =>{
    await mongoose.connect('mongodb+srv://niranjan:Niru2003@cluster0.fk1cgg8.mongodb.net/Food_Ordering_System').then(() => console.log('DB Connected'));
}