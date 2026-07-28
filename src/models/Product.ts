import mongoose from "mongoose";

export interface IProduct {
  name: string;
  description: string;
  price: number;
  imgUrl: string;
  categories: string[];
  options: string[];
}

const productSchema = new mongoose.Schema<IProduct>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imgUrl: { type: String, required: true },
  categories: { type: [String], required: true },
  options: { type: [String], required: true },
});

export const Product = mongoose.model<IProduct>("Product", productSchema);
