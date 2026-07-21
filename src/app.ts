import express from 'express';
import type { Request, Response } from 'express';

const app = express();
const PORT = 3002;

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

app.get('/users', (req: Request, res: Response) => {
  res.send('Petición GET a /users');
});

//---------------------------------post-------------------------------

// post 
// app.post('/', (req: Request, res: Response) => {
//   res.send('Got a POST request');
// });

app.post('/users', (req: Request, res: Response) => {
  res.send('Petición POST a /users');
});

//-------------------------------put-------------------------------

// app.put('/test', (req: Request, res: Response) => {
//   res.send('Test PUT');
// });

app.put('/users', (req: Request, res: Response) => {
  res.send('Petición PUT a /users');
});


//-------------------------------delete-------------------------------
// app.delete('/test', (req: Request, res: Response) => {
//   res.send('Test DELETE');
// });

app.delete('/users', (req: Request, res: Response) => {
  res.send('Petición DELETE a /users');
});

app.use('all', (req: Request, res: Response) => {
  res.status(404).send('Error 404: Ruta no encontrada. Esta API solo responde en /users');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo correctamente en http://localhost:${PORT}`);
});