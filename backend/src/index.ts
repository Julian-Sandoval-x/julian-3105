import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jtw from 'jsonwebtoken';
import type { User } from '../../frontend/src/types/index.ts';

const JWT_SECRET = 'clave_secreta_snailbet';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const usersDB: User[] = [];

app.post('/api/register', async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const userExists = usersDB.find(user => user.email === email);
    if (userExists) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser: User = {
      name,
      email,
      passwordHash
    };

    usersDB.push(newUser);
    
    res.status(201).json({ message: 'Usuario registrado correctamente' });

  } catch (error) {
    console.error("Error en el servidor: ", error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

app.post('/api/login', async (req: Request, res: Response) => {
  try {

    const {email, password} = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const user = usersDB.find(user => user.email === email);
    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    const payload = {
      email: user.email,
      name: user.name
    }

    const token = jtw.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ 
      message: 'Inicio de sesión exitoso',
      token,
      user: payload
    });

  } catch (error) {
    console.error("Error en el servidor: ", error);
    res.status(500).json({ message: 'Error en el servidor' });
  } 
});

app.post('/api/payment', (req: Request, res: Response) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ message: 'Monto inválido' });
  }

  // Simular un retraso en la transacción
  setTimeout(() => {
    // Simular una transacción exitosa
    res.status(200).json({ message: 'Transacción exitosa' });
  }, 5000);


});

app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: "Servidor mock de SnailPay funcionando correctamente",
  })
});

app.listen(port, () => {
  console.log(`Servidor mock de SnailPay escuchando en http://localhost:${port}`);
});