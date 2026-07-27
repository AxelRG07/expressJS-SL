import express from "express";
import type { Request, Response } from "express";
import fs from "fs";
import mongoose from "mongoose";

// Conexión a MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/practica_backend")
  .then(() => console.log("✅ Conectado a MongoDB local"))
  .catch((error) => console.error("❌ Error conectando a MongoDB:", error));

const app = express();
const PORT = 3002;

// Mètodo que permite al servidor entender el JSON que se envía en el cuerpo de la solicitud
app.use(express.json());

// Interfaz tipada para TypeScript
interface IUser {
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  username?: string;
  gender?: string;
}

// interface para los productos
interface IProducts {
  name: string;
  description: string;
  price: number;
  imgUrl: string;
  categories: string[];
  options: string[];
}

interface IPurchase {
  UserID: string;
  Products: { Id: string; quantity: number }[];
  Date: Date;
}

// Esquema de validación para MongoDB
const userSchema = new mongoose.Schema<IUser>({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
  username: { type: String },
  gender: { type: String },
});

// Definición del esquema para Productos
const productSchema = new mongoose.Schema<IProducts>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imgUrl: { type: String, required: true },
  categories: { type: [String], required: true },
  options: { type: [String], required: true },
});

// Definición del esquema para Purchases
const purchaseSchema = new mongoose.Schema<IPurchase>({
  UserID: { type: String, required: true },
  Products: [
    {
      Id: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  Date: { type: Date, required: true, default: Date.now() },
});

// Creación de los Modelos (La herramienta con la que haremos el CRUD)
const User = mongoose.model<IUser>("User", userSchema);
const Product = mongoose.model<IProducts>("Product", productSchema);
const Purchase = mongoose.model<IPurchase>("Purchase", purchaseSchema);

//-------------------get-------------------------------------------

// app.get('/', (req: Request, res: Response) => {
//   // extraer los parámetros de la consulta.
//   const name = req.query.name as string | undefined;
//   const lastName = req.query.lastName as string | undefined;

//   if (name && lastName) {
//     res.send(`Hola ${name} ${lastName}`);
//     return;
//   }

//   res.send('Hello World!!');
// });

//Users
app.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await User.find(); // Busca todos los documentos en la colección 'users'
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send("Error al obtener los usuarios");
  }
});

app.get("/users/:id", async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id); // Busca el usuario por su ID
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).send("ID de usuario inválido");
  }
});

//Products
app.get("/products", async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron productos registrados" });
    }
    return res.status(200).json(products);
  } catch (error) {
    return res.status(400).send("Error al obtener los productos");
  }
});

app.get("/products/:id", async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id); // Busca el producto por su ID
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    return res.status(200).json(product);
  } catch (error) {
    return res.status(400).send("ID de producto inválido");
  }
});

//Purchases
app.get("/purchases", async (req: Request, res: Response) => {
  try {
    const purchases = await Purchase.find();
    if (purchases.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron compras registradas" });
    }
    return res.status(200).json(purchases);
  } catch (error) {
    return res.status(400).send("Error al obtener las compras");
  }
});

app.get("/purchases/:id", async (req: Request, res: Response) => {
  try {
    const purchase = await Purchase.findById(req.params.id); // Busca la compra por su ID
    if (!purchase) {
      return res.status(404).json({ message: "Compra no encontrada" });
    }
    return res.status(200).json(purchase);
  } catch (error) {
    return res.status(400).send("ID de compra inválido");
  }
});

//---------------------------------POST-------------------------------

// post
// app.post('/', (req: Request, res: Response) => {
//   res.send('Got a POST request');
// });

//Users
app.post("/users", async (req: Request, res: Response) => {
  try {
    const newUser = await User.create(req.body); // Crea un nuevo documento en la colección 'users'
    res.status(201).json({
      mensaje: "Usuario creado exitosamente",
      usuario: newUser,
    });
  } catch (error) {
    res.status(400).send("Error al crear el usuario");
  }
});

//Products
app.post("/products", async (req: Request, res: Response) => {
  try {
    const newProduct = await Product.create(req.body); // Crea un nuevo documento en la colección 'products'
    res.status(201).json({
      mensaje: "Producto creado exitosamente",
      producto: newProduct,
    });
  } catch (error) {
    res.status(400).send("Error al crear el producto");
  }
});

//Purchases
app.post("/purchases", async (req: Request, res: Response) => {
  try {
    const newPurchase = await Purchase.create(req.body); // Crea una nueva compra en la colección 'purchases'
    res.status(201).json({
      mensaje: "Compra creada exitosamente",
      compra: newPurchase,
    });
  } catch (error) {
    res.status(400).send("Error al crear la compra");
  }
});

//-------------------------------PUT-------------------------------

// app.put('/test', (req: Request, res: Response) => {
//   res.send('Test PUT');
// });

//users
app.put("/users/:id", async (req: Request, res: Response) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }); // Actualiza el usuario por su ID
    if (!updatedUser) {
      res.status(404).send("Usuario no encontrado");
      return;
    }
    res.status(200).json({
      mensaje: "Usuario actualizado exitosamente",
      usuario: updatedUser,
    });
  } catch (error) {
    res.status(400).send("Error al actualizar el usuario");
  }
});

//products
app.put("/products/:id", async (req: Request, res: Response) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
    ); // Actualiza el producto por su ID
    if (!updatedProduct) {
      res.status(404).send("Producto no encontrado");
      return;
    }
    res.status(200).json({
      mensaje: "Producto actualizado exitosamente",
      producto: updatedProduct,
    });
  } catch (error) {
    res.status(400).send("Error al actualizar el producto");
  }
});

//purchases
app.put("/purchases/:id", async (req: Request, res: Response) => {
  try {
    const updatedPurchase = await Purchase.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
    ); // Actualiza la compra por su ID
    if (!updatedPurchase) {
      res.status(404).send("Compra no encontrada");
      return;
    }
    res.status(200).json({
      mensaje: "Compra actualizada exitosamente",
      compra: updatedPurchase,
    });
  } catch (error) {
    res.status(400).send("Error al actualizar la compra");
  }
});

//-------------------------------DELETE-------------------------------
// app.delete('/test', (req: Request, res: Response) => {
//   res.send('Test DELETE');
// });

//users
app.delete("/users/:id", async (req: Request, res: Response) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id); // Elimina el usuario por su ID
    if (!deletedUser) {
      res.status(404).send("Usuario no encontrado");
      return;
    }
    res.status(200).json({
      mensaje: "Usuario eliminado exitosamente",
      usuario: `${deletedUser._id} ${deletedUser.first_name} ${deletedUser.last_name}`,
    });
  } catch (error) {
    res.status(400).send("Error al eliminar el usuario");
  }
});

//products
app.delete("/products/:id", async (req: Request, res: Response) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id); // Elimina el producto por su ID
    if (!deletedProduct) {
      res.status(404).send("Producto no encontrado");
      return;
    }
    res.status(200).json({
      mensaje: "Producto eliminado exitosamente",
      producto: `${deletedProduct._id} ${deletedProduct.name} ${deletedProduct.price}`,
    });
  } catch (error) {
    res.status(400).send("Error al eliminar el producto");
  }
});

//purchases
app.delete("/purchases/:id", async (req: Request, res: Response) => {
  try {
    const deletedPurchase = await Purchase.findByIdAndDelete(req.params.id); // Elimina la compra por su ID
    if (!deletedPurchase) {
      res.status(404).send("Compra no encontrada");
      return;
    }
    res.status(200).json({
      mensaje: "Compra eliminada exitosamente",
      compra: `${deletedPurchase._id} ${deletedPurchase.UserID} ${deletedPurchase.Date}`,
    });
  } catch (error) {
    res.status(400).send("Error al eliminar la compra");
  }
});

app.use((req: Request, res: Response) => {
  res
    .status(404)
    .send("Error 404: Ruta no encontrada. Esta API solo responde en /users");
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo correctamente en http://localhost:${PORT}`);
});
