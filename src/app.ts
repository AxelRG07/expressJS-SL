import express from 'express';
import type { Request, Response } from 'express';
import fs from 'fs';

const app = express();
const PORT = 3002;

// Mètodo que permite al servidor entender el JSON que se envía en el cuerpo de la solicitud
app.use(express.json());

interface User {
  id: number;
  password?: string;
  first_name?: string;
  last_name?: string;
  username?: string;
  email?: string;
  gender?: string;
}

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

// Modulo fs(File System) para leer y escribir archivos locales
app.get('/users', (req: Request, res: Response) => {
  res.send(fs.readFileSync('./data/users.json', 'utf8'));
});

app.get('/users/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));
  const user = users.find((user: any) => user.id === id);
  if (user) {
    res.send(user);
  } else {
    res.status(404).send('Usuario no encontrado');
  }
  return 
});

//---------------------------------post-------------------------------

// post 
// app.post('/', (req: Request, res: Response) => {
//   res.send('Got a POST request');
// });

app.post('/users', (req: Request, res: Response) => {
  const newUser: User = req.body;
  // Leer el archivo JSON
  const users: User[] = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));
  // Agregar el nuevo usuario
  users.push(newUser);
  // Escribir el archivo JSON
  fs.writeFileSync('./data/users.json', JSON.stringify(users));
  res.send(`{"Usuario ${newUser.first_name} creado correctamente"}`);
});

//-------------------------------put-------------------------------

// app.put('/test', (req: Request, res: Response) => {
//   res.send('Test PUT');
// });

app.put('/users/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const users: User[] = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));
  const userId = users.findIndex(u => u.id === id);
  if (userId === -1) {
    res.status(404).send('Usuario no encontrado');
    return;
  }
  const updatedUser = {
    ...users[userId],
    ...req.body,
    id: id,
  };
  users[userId] = updatedUser;
  fs.writeFileSync('./data/users.json', JSON.stringify(users));
  res.send(`Usuario ${id} actualizado correctamente`);
});


//-------------------------------delete-------------------------------
// app.delete('/test', (req: Request, res: Response) => {
//   res.send('Test DELETE');
// });

app.delete('/users/:id', (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const users: User[] = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));
  const userId = users.findIndex(user => user.id === id);
  if (userId === -1) {
    res.status(404).send('Usuario no encontrado');
    return;
  }
  users.splice(userId, 1);
  fs.writeFileSync('./data/users.json', JSON.stringify(users));
  res.send(`Usuario ${id} eliminado correctamente`);
});

app.use('all', (req: Request, res: Response) => {
  res.status(404).send('Error 404: Ruta no encontrada. Esta API solo responde en /users');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo correctamente en http://localhost:${PORT}`);
});