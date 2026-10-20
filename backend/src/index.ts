import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jtw from 'jsonwebtoken';
import 'dotenv/config';
import type { Request, Response } from 'express';
import type { PaymentStatus, User } from './types/index.js';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET no está definido en las variables de entorno');
}

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
  const { id, email, amount, card } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ 
        id: Math.floor(Math.random() * 1000000),
        title: 'Fondos insuficientes',
        status: 'insufficient_funds',
        status_detail: 'Monto inválido',
        transaction_amount: amount,
        date_created: new Date().toISOString(),
        authorization_code: 'AUTH123456',
        reference: 'REF123456',
        payer_id: id,
        payer_email: email
      });
  }

  if (!id) {
    return res.status(400).json({
        id: Math.floor(Math.random() * 1000000),
        title: 'ID de usuario inválido',
        status: 'invalid_user_id',
        status_detail: 'Usuario inválido',
        transaction_amount: amount,
        date_created: new Date().toISOString(),
        authorization_code: 'AUTH123456',
        reference: 'REF123456',
        payer_id: id,
        payer_email: email
      });
  }

  if (!email) {
    return res.status(400).json({ 
      id: Math.floor(Math.random() * 1000000),
      title: 'Email de usuario inválido',
      status: 'invalid_email',
      status_detail: 'Email de usuario inválido',
      transaction_amount: amount,
      date_created: new Date().toISOString(),
      authorization_code: 'AUTH123456',
      reference: 'REF123456',
      payer_id: id,
      payer_email: email
    });
  }

  if (!card || card.length < 4) {
    return res.status(400).json({ 
      id: Math.floor(Math.random() * 1000000),
      title: 'Número de tarjeta inválido',
      status: 'invalid_card',
      status_detail: 'Número de tarjeta inválido',
      transaction_amount: amount,
      date_created: new Date().toISOString(),
      authorization_code: 'AUTH123456',
      reference: 'REF123456',
      payer_id: id,
      payer_email: email
    });
  }

  const lastNumberCard = card.slice(-4);

  if (lastNumberCard === '0000') {
    setTimeout(() => {
      res.status(402).json({ 
        id: Math.floor(Math.random() * 1000000),
        title: 'Fondos insuficientes',
        status: 'insufficient_funds',
        status_detail: 'No tienes suficientes fondos para realizar esta transacción.',
        transaction_amount: amount,
        date_created: new Date().toISOString(),
        authorization_code: 'AUTH123456',
        reference: 'REF123456',
        payer_id: id,
        payer_email: email
      });
    }, 5000);
  }

  if (lastNumberCard === '9999') {
    setTimeout(() => {
      res.status(503).json({ 
        id: Math.floor(Math.random() * 1000000),
          status: 'network_error',
          title: 'Error de red',
          status_detail: 'SnailPay no está disponible temporalmente. Por favor, inténtalo de nuevo más tarde.',
          transaction_amount: amount,
          date_created: new Date().toISOString(),
          authorization_code: 'AUTH123456',
          reference: 'REF123458',
          payer_id: id,
          payer_email: email
      });
    }, 5000);
  }

  if (lastNumberCard === '1234') {
    setTimeout(() => {
      res.status(200).json({ 
          id: Math.floor(Math.random() * 1000000),
          status: 'success',
          title: '¡Pago exitoso!',
          status_detail: 'Pago procesado exitosamente',
          transaction_amount: amount,
          date_created: new Date().toISOString(),
          authorization_code: 'AUTH123456',
          reference: 'REF123404',
          payer_id: id,
          payer_email: email
        });
      }, 5000);
  }

  if (lastNumberCard === '5678') {
    setTimeout(() => {
      res.status(402).json({ 
          id: Math.floor(Math.random() * 1000000),
          status: 'transaction_failed',
          title: 'Error en la transacción',
          status_detail: 'Ocurrió un error en la transacción. Por favor, inténtalo de nuevo.',
          transaction_amount: amount,
          date_created: new Date().toISOString(),
          authorization_code: 'AUTH123456',
          reference: 'REF123404',
          payer_id: id,
          payer_email: email
        });
      }, 5000);
  }

  setTimeout(() => {
    res.status(200).json({ 
        id: Math.floor(Math.random() * 1000000),
        status: 'success',
        title: '¡Pago exitoso!',
        status_detail: 'Pago procesado exitosamente',
        transaction_amount: amount,
        date_created: new Date().toISOString(),
        authorization_code: 'AUTH123456',
        reference: 'REF123456',
        payer_id: id,
        payer_email: email
    });
  }, 5000);

});



app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: "Servidor mock de SnailPay funcionando correctamente",
  })
});

export default app;