import express from 'express';
import type { Request, Response } from 'express';
import fs from 'fs';
import mongoose from 'mongoose';

// Conexión a MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/practica_backend')
  .then(() => console.log('✅ Conectado a MongoDB local'))
  .catch((error) => console.error('❌ Error conectando a MongoDB:', error));

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

// Esquema de validación para MongoDB
const userSchema = new mongoose.Schema<IUser>({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
  username: { type: String },
  gender: { type: String }
});

// Creación del Modelo (La herramienta con la que haremos el CRUD)
const User = mongoose.model<IUser>('User', userSchema);

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

// 
app.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await User.find(); // Busca todos los documentos en la colección 'users'
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send('Error al obtener los usuarios');
  }
});

app.get('/users/:id', async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id); // Busca el usuario por su ID
    if(!user) {
      return res.status(404).json({message: 'Usuario no encontrado'})
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).send('ID de usuario inválido');
  }
});

//---------------------------------post-------------------------------

// post 
// app.post('/', (req: Request, res: Response) => {
//   res.send('Got a POST request');
// });

app.post('/users', async (req: Request, res: Response) => {
  try {
    const newUser = await User.create(req.body); // Crea un nuevo documento en la colección 'users'
    res.status(201).json({ 
      mensaje: "Usuario creado exitosamente",
      usuario: newUser 
    });
  } catch (error) {
    res.status(400).send('Error al crear el usuario');
  }
});

//-------------------------------put-------------------------------

// app.put('/test', (req: Request, res: Response) => {
//   res.send('Test PUT');
// });

app.put('/users/:id', async (req: Request, res: Response) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true}); // Actualiza el usuario por su ID
    if (!updatedUser) {
      res.status(404).send('Usuario no encontrado');
      return;
    }
    res.status(200).json({ mensaje: 'Usuario actualizado exitosamente', usuario: updatedUser });
  } catch (error) {
    res.status(400).send('Error al actualizar el usuario');
  }
});


//-------------------------------delete-------------------------------
// app.delete('/test', (req: Request, res: Response) => {
//   res.send('Test DELETE');
// });

app.delete('/users/:id', async (req: Request, res: Response) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id); // Elimina el usuario por su ID
    if (!deletedUser) {
      res.status(404).send('Usuario no encontrado');
      return;
    }
    res.status(200).json({ mensaje: 'Usuario eliminado exitosamente', usuario: `${deletedUser._id} ${deletedUser.first_name} ${deletedUser.last_name}` });
  } catch (error) {
    res.status(400).send('Error al eliminar el usuario');
  }
});

app.use((req: Request, res: Response) => {
  res.status(404).send('Error 404: Ruta no encontrada. Esta API solo responde en /users');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo correctamente en http://localhost:${PORT}`);
});