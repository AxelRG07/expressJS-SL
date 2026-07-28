import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/practica_backend");
    console.log("✅ Conectado a MongoDB local");
  } catch (error) {
    console.error("❌ Error conectando a MongoDB:", error);
    process.exit(1);
  }
};
