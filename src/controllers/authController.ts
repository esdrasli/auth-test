import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import fs from 'fs';
import path from 'path';

// Carregar as chaves RSA dos arquivos gerados
const privateKey = fs.readFileSync(path.resolve(__dirname, '../../private.pem'), 'utf8');
const publicKey = fs.readFileSync(path.resolve(__dirname, '../../public.pem'), 'utf8');

if (!privateKey || !publicKey) {
  throw new Error('Chaves RSA não configuradas corretamente');
}

interface LoginRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

interface DecryptRequest extends Request {
  body: {
    token: string;
  };
}

export const login = (req: LoginRequest, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;
    const timestamp = new Date().toISOString();

    const payload = { email, password, timestamp };
    const token = jwt.sign(payload, privateKey, { algorithm: 'RS256' });

    res.json({ token });
  } catch (error) {
    next(error);
  }
};

export const decrypt = (req: DecryptRequest, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { token } = req.body;

    const payload = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
    res.json({ payload });
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};
