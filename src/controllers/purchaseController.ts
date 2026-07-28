import type { Request, Response } from "express";
import { Purchase } from "../models/Purchase.js";

//GET PURCHASES
export const getPurchases = async (req: Request, res: Response) => {
  try {
    const purchases = await Purchase.find();
    res.status(200).json({
      message: `${purchases.length} compras encontradas`,
      purchases,
    });
  } catch (error) {
    res.status(500).send("Error al obtener las compras");
  }
};

//GET PURCHASE BY ID
export const getPurchaseById = async (req: Request, res: Response) => {
  try {
    const purchase = await Purchase.findById(req.params.id);
    if (!purchase)
      return res.status(404).json({ message: "Compra no encontrada" });
    res.status(200).json(purchase);
  } catch (error) {
    res.status(400).send("ID de compra inválido");
  }
};

//POST PURCHASE
export const createPurchase = async (req: Request, res: Response) => {
  try {
    const newPurchase = await Purchase.create(req.body);
    res.status(200).json({
      message: "Compra realizada exitosamente",
      purchase: newPurchase,
    });
  } catch (error) {
    res.status(500).send("Error al realizar la compra");
  }
};

//PUT PURCHASE
export const updatePurchase = async (req: Request, res: Response) => {
  try {
    const updatedPurchase = await Purchase.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
    );
    if (!updatedPurchase)
      return res.status(404).json({ message: "Compra no encontrada" });
    res.status(200).json({ message: "Compra actualizada exitosamente" });
  } catch (error) {
    res.status(400).send("ID de compra inválido");
  }
};

//DELETE PURCHASE
export const deletePurchase = async (req: Request, res: Response) => {
  try {
    const deletedPurchase = await Purchase.findByIdAndDelete(req.params.id);
    if (!deletedPurchase)
      return res.status(404).json({ message: "Compra no encontrada" });
    res.status(200).json({ message: "Compra eliminada exitosamente" });
  } catch (error) {
    res.status(400).send("ID de compra inválido");
  }
};
