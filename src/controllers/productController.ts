import type { Request, Response } from "express";
import { Product } from "../models/Product.js";

//GET PRODUCTS
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      message: `${products.length} productos encontrados`,
      products,
    });
  } catch (error) {
    res.status(500).send("Error al obtener los productos");
  }
};

//GET PRODUCT BY ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Producto no encontrado" });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).send("ID de producto inválido");
  }
};

//POST PRODUCT
export const createProduct = async (req: Request, res: Response) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(200).json({
      message: "Producto creado exitosamente",
      producto: newProduct,
    });
  } catch (error) {
    res.status(500).send("Error al crear el producto");
  }
};

//PUT PRODUCT
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
    );
    if (!updatedProduct)
      return res.status(404).json({ message: "Producto no encontrado" });
    res.status(200).json({ message: "Producto actualizado exitosamente" });
  } catch (error) {
    res.status(400).send("ID de producto inválido");
  }
};

//DELETE PRODUCT
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct)
      return res.status(404).json({ message: "Producto no encontrado" });
    res.status(200).json({ message: "Producto eliminado exitosamente" });
  } catch (error) {
    res.status(400).send("ID de producto inválido");
  }
};
