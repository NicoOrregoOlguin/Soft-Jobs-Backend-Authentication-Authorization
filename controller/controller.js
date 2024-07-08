import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../query/db.js';

const secretKey = 'your_secret_key';

export const registerUser = async (req, res) => {
  const { email, password, rol, lenguage } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query('INSERT INTO usuarios (email, password, rol, lenguage) VALUES ($1, $2, $3, $4) RETURNING *', [email, hashedPassword, rol, lenguage]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const user = result.rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ email: user.email }, secretKey, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
};

export const getUser = async (req, res) => {
  const { email } = req.user;

  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user data' });
  }
};
