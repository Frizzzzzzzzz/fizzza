const express = require('express');
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
require('dotenv').config({path:__dirname + '/.env'})
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');

const app = express();
const PORT = process.env.PORT || 5000;

const secretKey = process.env.SECRET_KEY || 'FkfxUTUP';

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use('/users', express.static('users'));
app.use(express.urlencoded({ extended: true }));

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Frizz",
  password: "123321",
  port: "5432",
});

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.authToken;

  if (!token) {
    return res.status(401).json({ message: 'Токен отсутствует' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    console.log(decoded);
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Неверный токен' });
  }
};

app.get('/main.html', authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'main.html'));
});

app.get('/menu.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'menu.html'));
});

app.get('/reg.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'reg.html'));
});

app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  
  try {
      const userExists = await pool.query(
          'SELECT id FROM users WHERE email = $1',
          [email]
      );
      
      if (userExists.rows.length > 0) {
          return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
      }
      
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);
      
      const newUser  = await pool.query(
          'INSERT INTO users (email, password_hash, role) VALUES ($1, $2, $3) RETURNING id, email, role',
          [email, passwordHash, 1]
      );
      
      const payload = {
          id: newUser .rows[0].id,
          email: newUser .rows[0].email,
          role: newUser .rows[0].role
      };
      
      const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
      
      res.cookie('authToken', token, {
          secure: process.env.NODE_ENV === 'production',
          httpOnly: true,
          maxAge: 86400000,
          sameSite: 'strict'
      });

      res.status(201).json({ 
          message: 'Регистрация успешна',
          user: {
              id: newUser.rows[0].id,
              email: newUser.rows[0].email,
              role: newUser.rows[0].role
          },
          token: token
      });

  } catch (error) {
      console.error('Ошибка при регистрации:', error);
      res.status(500).json({ message: 'Ошибка сервера при регистрации' });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      const user = result.rows[0];

      if (!user) {
          return res.status(400).json({ message: 'Пользователь не найден' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password_hash);
      
      if (!isPasswordValid) {
          return res.status(401).json({ message: 'Неверный пароль' });
      }

      const payload = {
          id: user.id,
          email: user.email,
          role: user.role
      };

      const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
      res.cookie('authToken', token, {
          secure: process.env.NODE_ENV === 'production',
          httpOnly: true,
          maxAge: 86400000,
          sameSite: 'strict'
      });

      res.status(200).json({ message: 'Успешный вход', token: token });
  } catch (error) {
      console.error('Ошибка при входе:', error);
      res.status(500).json({ message: 'Ошибка сервера' });
  }
});

app.get('/log.html', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'auth.html'));
});



app.listen(PORT, () => {
  console.log(`HTTP сервер запущен на http://localhost:${PORT}/main.html`);
});