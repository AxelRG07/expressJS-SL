import mongoose from "mongoose";

export interface IPurchase {
  UserID: string;
  Products: [
    {
      Id: string;
      quantity: number;
    },
  ];
  Date: Date;
}

const purchaseSchema = new mongoose.Schema({
  UserID: { type: String, required: true },
  Products: [
    {
      Id: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  Date: { type: Date, required: true },
});

export const Purchase = mongoose.model<IPurchase>("Purchase", purchaseSchema);
