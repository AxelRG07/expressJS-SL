import express from 'express';
import type { Request, Response } from 'express';

const app = express();
const PORT = 3002;

app.get('/', (req: Request, res: Response) => {
  // extraer los parámetros de la consulta. 
  const name = req.query.name as string | undefined;
  const lastName = req.query.lastName as string | undefined;

  if (name && lastName) {
    res.send(`Hola ${name} ${lastName}`);
    return;
  }

  res.send('Hello World!!');
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo correctamente en http://localhost:${PORT}`);
});